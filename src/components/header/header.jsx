import Navbar from "./navbar";
import { twMerge } from "tailwind-merge";
import Button from "../ui/button";
import ThemeToggle from "../theme-toggle";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowRight from "../icons/arrowRight";
import MenuIcon from "./menu-icon";
import { useMenuModal } from "../../store/useMenuModal";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, toggleModal } = useMenuModal();

  const handleNavigation = () => {
    navigate("/craft");
  };

  return (
    <header
      className={twMerge(
        "bg-white/60 border-b-[6px] border-b-foreground w-full py-4",
        "fixed top-0 right-0 left-0 z-[999] ",
        "backdrop-blur-[0.5rem] supports-[backdrop-filter]:bg-background/80"
      )}
    >
      <div
        className={twMerge(
          "md:w-[54rem] lg:w-4xl xl:w-7xl",
          "mx-auto px-4",
          "grid grid-cols-3 "
        )}
      >
        <div className={twMerge("col-span-1 justify-self-start")}>
          <h1
            onClick={() => navigate("/")}
            className={twMerge(
              " md:text-4xl text-2xl font-bold tracking-tighter "
            )}
          >
            ApiCraft
          </h1>
        </div>

        <div className={twMerge("col-span-1 justify-self-center")}>
          {location?.pathname !== "/craft" && <Navbar />}
        </div>

        <div
          className={twMerge(
            "flex items-center col-span-1 justify-self-end gap-x-4"
          )}
        >
          <ThemeToggle
            className={twMerge(
              "border-3 p-1 md:p-2 md:border-4",
              location.pathname === "/" ? "hidden md:flex" : "flex"
            )}
            iconStyle="w-5 h-5 md:w-6 md:h-6"
          />

          {location?.pathname !== "/craft" && (
            <Button
              className="py-3 font-extrabold md:flex hidden"
              onClick={handleNavigation}
              title="Get Started"
              rightIcon={ArrowRight}
              righticon="group-hover:translate-x-2 transition-transform"
            />
          )}

          {location?.pathname !== "/craft" && (
            <MenuIcon menuOpen={isOpen} toggleMenu={toggleModal} />
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
