import { NavbarButton } from "./NavbarButton";
import { navbarLinks } from "@/utils/url/navbar";

export const BottomNavbar = () => {
  return (
    <div className="z-40 w-full h-[68px] bg-white bg-opacity-85 flex justify-around align-middle fixed left-0 right-0 bottom-0 md:hidden">
      {navbarLinks.map((el) => {
        return (
          <NavbarButton
            key={el.name}
            href={el.href}
            name={el.name}
            activePath={el.activePath}
          />
        );
      })}
    </div>
  );
};
