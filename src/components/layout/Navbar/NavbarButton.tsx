"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";

interface NavbarButtonProps {
  href: string;
  name: string;
}
export const NavbarButton = ({ href, name }: NavbarButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isHovered, setIsHovered] = useState(false);

  const user = useAuthStore((state) => state.user);

  const pageHref = name === "user" ? `/user/${user?.id}` : href;

  const iconBasePath = "/icons/";
  const getIconSrc = () => {
    if (isActive) {
      return `${iconBasePath}${name}_filled.svg`; // 활성화된 경우 filled 아이콘 반환
    }
    return isHovered
      ? `${iconBasePath}${name}_filled.svg`
      : `${iconBasePath}${name}_border.svg`;
  };

  return (
    <button
      className="flex-1 flex items-center justify-center m-1 rounded-lg 
      hover:bg-slate-100 transition-all duration-300 ease-in-out
      md:h-16 md:flex-none md:hover:bg-slate-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={pageHref}>
        <div
          className={`transition-transform duration-300 ease-in-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        >
          <Image
            src={getIconSrc()}
            alt={name}
            priority={true}
            width={26}
            height={26}
          />
        </div>
      </Link>
    </button>
  );
};
