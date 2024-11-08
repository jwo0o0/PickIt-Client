import Image from "next/image";

export const ProfileImage = ({
  imageUrl,
  width,
  sizes,
}: {
  imageUrl: string | null | undefined;
  width?: number;
  sizes: string;
}) => {
  const size: { [key: number]: string } = {
    10: "w-10 h-10",
    12: "w-12 h-12",
    16: "w-16 h-16",
    20: "w-20 h-20",
  };
  return (
    <div
      className={`${
        width ? size[width] : "w-10 h-10"
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
