"use client"; // Error components must be Client Components

import { useEffect } from "react";

// error와 reset이라는 프롭스를 받아서 에러를 로깅하거나 다시 해당 에러 영역을 복구
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
