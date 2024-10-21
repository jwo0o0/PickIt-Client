"use client";
import { useState } from "react";
import { useSignup } from "@/lib/auth/hooks/useSignup";
import { useLogout } from "@/lib/auth/hooks/useLogout";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const { mutate: signupMutation, isPending, error } = useSignup();
  const { mutate: logoutMutation } = useLogout();

  const handleSignup = () => {
    signupMutation({
      userData: {
        email,
        password,
        nickname,
        bio,
        profileImage,
      },
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProfileImage(file);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleSignup}>Sign Up</button>
      </form>
      <button
        onClick={() => {
          logoutMutation();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
