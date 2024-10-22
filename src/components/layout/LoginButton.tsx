import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Button className="fixed top-4 right-4">
      <Link href="/login">로그인</Link>
    </Button>
  );
};
