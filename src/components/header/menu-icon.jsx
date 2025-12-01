import { twMerge } from "tailwind-merge";

const MenuIcon = ({ toggleMenu, menuOpen }) => {
  return (
    <button
      onClick={toggleMenu}
      className={twMerge(
        "border-3 border-foreground p-2 ",
        "transition-colors",
        "md:hidden flex flex-col gap-1.5"
      )}
      aria-label="Toggle menu"
    >
      <span
        className={twMerge(
          "w-6 h-0.5 bg-foreground transition-all",
          menuOpen ? "rotate-45 translate-y-1.5" : ""
        )}
      />
      <span
        className={twMerge(
          "w-6 h-0.5 bg-foreground transition-all",
          menuOpen ? "opacity-0" : ""
        )}
      />
      <span
        className={twMerge(
          "w-6 h-0.5 bg-foreground transition-all",
          menuOpen ? "-rotate-45 -translate-y-1.5" : ""
        )}
      />
    </button>
  );
};

export default MenuIcon;
