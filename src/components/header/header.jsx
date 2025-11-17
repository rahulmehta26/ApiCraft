import Navbar from "./navbar";
import { twMerge } from "tailwind-merge";
import Button from "../ui/button";
import ThemeToggle from "../theme-toggle";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    navigate("/craft");
  };

  return (
    <header
      className={twMerge(
        "bg-white/60 border-b-[6px] border-b-foreground w-full py-4",
        "fixed top-0 right-0 left-0 z-50 ",
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
          <h1 onClick={() => navigate("/")} className={twMerge(" text-4xl font-bold tracking-tighter ")}>
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
          <ThemeToggle />

          {
            location?.pathname !== "/craft" && (

              <Button
                className="py-3 font-mono font-extrabold"
                onClick={handleNavigation}
                title="Get Started"
              />
            )
          }

        </div>
      </div>
    </header>
  );
};

export default Header;
