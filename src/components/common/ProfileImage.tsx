import Image from "next/image";

export const ProfileImage = ({
  imageUrl,
  width,
  mdWidth,
  sizes,
}: {
  imageUrl: string | null | undefined;
  width?: number;
  mdWidth?: number;
  sizes: string;
}) => {
  return (
    <div
      className={`w-${width || "10"} h-${width || 10} ${
        mdWidth ? "md:w-" + mdWidth + " md:h-" + mdWidth : ""
      } border bg-slate-200 rounded-full
      display: flex justify-center items-center overflow-hidden relative`}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="프로필 이미지" fill={true} sizes={sizes} />
      ) : (
        <Image
          src="/images/default_user_profile.webp"
          alt="프로필 이미지"
          width={0}
          height={0}
          sizes={sizes}
          style={{
            width: "70%",
            height: "auto",
          }}
        />
      )}
    </div>
  );
};
