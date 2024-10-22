import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  chat_filled,
  chat_border,
  home_border,
  home_filled,
  like_border,
  like_filled,
  write_border,
  write_filled,
  user_border,
  user_filled,
} from "@/assets/icons";

interface NavbarButtonProps {
  href: string;
  name: string;
}
export const NavbarButton = ({ href, name }: NavbarButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIconSrc = () => {
    switch (name) {
      case "home":
        return isHovered ? home_filled : home_border;
      case "chat":
        return isHovered ? chat_filled : chat_border;
      case "like":
        return isHovered ? like_filled : like_border;
      case "write":
        return isHovered ? write_filled : write_border;
      case "user":
        return isHovered ? user_filled : user_border;
      default:
        return home_border; // 기본값은 home border 아이콘
    }
  };

  return (
    <button
      className="flex-1 flex items-center justify-center m-1 rounded-lg 
      hover:bg-gray-100 transition-all duration-300 ease-in-out
      md:h-16 md:flex-none md:hover:bg-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href}>
        <div
          className={`transition-transform duration-300 ease-in-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        >
          <Image src={getIconSrc()} alt={name} priority={true} />
        </div>
      </Link>
    </button>
  );
};
