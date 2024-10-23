import { NavbarButton } from "./NavbarButton";

export const BottomNavbar = () => {
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
      href: "/user",
      name: "user",
    },
  ];
  return (
    <div className="w-full h-[68px] bg-white bg-opacity-85 flex justify-around align-middle fixed bottom-0 md:hidden">
      {links.map((el) => {
        return <NavbarButton key={el.name} href={el.href} name={el.name} />;
      })}
    </div>
  );
};
