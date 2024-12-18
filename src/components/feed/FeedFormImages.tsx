import { useEffect, useState } from "react";
import Image from "next/image";

interface FeedFormImagesProps {
  images: (File | string)[];
  onDelete: (idx: number) => void;
}
export const FeedFormImages = ({ images, onDelete }: FeedFormImagesProps) => {
  const [blobUrls, setBlobUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = images.map((image) =>
      typeof image === "string" ? image : URL.createObjectURL(image)
    );
    setBlobUrls(urls);

    return () => {
      urls.forEach((url, idx) => {
        if (typeof images[idx] !== "string") {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images]);

  return (
    <>
      {blobUrls.map((url, idx) => {
        return (
          <div
            key={idx}
            className="w-20 h-20 border border-slate-300 ml-2 relative shrink-0"
          >
            <Image
              src={url}
              fill={true}
              sizes="100%"
              alt={`image-${idx}`}
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => {
                if (typeof images[idx] !== "string") {
                  URL.revokeObjectURL(url);
                }
                onDelete(idx);
              }}
              className="absolute top-1 right-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 fill-slate-950"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </>
  );
};
