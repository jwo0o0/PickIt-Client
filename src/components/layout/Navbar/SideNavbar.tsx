import { NavbarButton } from "./NavbarButton";
import { navbarLinks } from "@/utils/url/navbar";

export const SideNavbar = () => {
  return (
    <div className="hidden md:flex flex-col justify-center bg-slate-100 w-[75px] fixed left-0 top-0 bottom-0">
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
