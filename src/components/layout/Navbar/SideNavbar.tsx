import Link from "next/link";
import { NavbarButton } from "./NavbarButton";

export const SideNavbar = () => {
  const links = [
    {
      href: "/",
      name: "home",
    },
    {
      href: "/chat",
      name: "chat",
    },
    {
      href: "/feed/write",
      name: "write",
    },
    {
      href: "/interest/likes",
      name: "like",
    },
    {
      href: "/user/[id]?id=1",
      name: "user",
    },
  ];

  return (
    <div className="hidden md:flex flex-col justify-center bg-gray-100 w-[75px] fixed left-0 top-0 bottom-0">
      {links.map((el) => {
        return <NavbarButton key={el.name} href={el.href} name={el.name} />;
      })}
    </div>
  );
};
