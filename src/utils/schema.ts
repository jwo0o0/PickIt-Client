import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: "올바른 이메일을 입력해주세요." });

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,15}$/;
const passwordSchema = z
  .string()
  .min(8, { message: "8자리 이상 입력해 주세요." })
  .max(15, { message: "15자리 이하 입력해 주세요." })
  .regex(passwordRegex, {
    message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
  });

const confirmPasswordSchema = z
  .string()
  .min(1, { message: "비밀번호를 한번 더 입력해 주세요." });

const nicknameSchema = z
  .string()
  .min(1, { message: "닉네임을 입력해 주세요." })
  .max(20, { message: "20자 이하로 입력해 주세요." });

const profileImageSchema = z
  .instanceof(File)
  .refine((file) => file.size < 5 * 1024 * 1024, {
    message: "5MB 이하의 파일을 업로드해 주세요.",
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    message: "이미지 파일은 JPG 또는 PNG 형식이어야 합니다.",
  })
  .optional();

const bioSchema = z
  .string()
  .max(100, { message: "100자 이하로 입력해 주세요." })
  .optional();

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    bio: bioSchema,
    profileImage: profileImageSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type LoginPayload = z.infer<typeof loginSchema>;
export type SignupPayload = z.infer<typeof signupSchema>;
