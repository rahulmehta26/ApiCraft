import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { TrafficLight } from "../../components/ui/traffic-light";
import { useLocation, useNavigate } from "react-router-dom";
import Refresh from "../../components/icons/refresh";
import X from "../../components/icons/x";
import Minus from "../../components/icons/minus";
import Minimize from "../../components/icons/minimize";
import Button from "../../components/ui/button";
import ErrorBody from "./error-body";

const ErrorState = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = () => navigate("/");

  const validRoutes = ["/", "/craft"];

  const [inputPath, setInputPath] = useState(location?.pathname || "/");

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (value === "") {
      setInputPath("/");
      return;
    }

    if (!value.startsWith("/")) {
      value = "/" + value;
    }

    setInputPath(value);
  };

  const handleGo = () => {
    const path = inputPath?.trim();

    if (!path || path === "") {
      navigate("/");
      return;
    }

    if (validRoutes.includes(path)) {
      navigate(path);
    } else {
      navigate("*");
    }
  };

  return (
    <ErrorBody>
      <div
        className={twMerge(
          "py-2 md:py-4 px-4",
          "flex justify-between items-center"
        )}
      >
        <TrafficLight />

        <div className={twMerge("flex gap-3 md:gap-5 items-center")}>
          <Minus className="h-3 w-3 md:h-5 md:w-5" />
          <Minimize className="h-2.5 w-2.5 md:h-4 md:w-4" />
          <X
            onClick={handleNavigation}
            className="h-3.5 w-3.5 md:h-5.5 md:w-5.5 text-background dark:text-foreground cursor-pointer"
          />
        </div>
      </div>

      <div
        className={twMerge(
          "w-full h-auto p-[3px] px-[6px] md:p-2",
          "bg-yellow border-b-4 border-t-4 border-background",
          "flex justify-center items-center gap-2 md:gap-4"
        )}
      >
        <Refresh
          onClick={handleNavigation}
          className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
        />

        <div
          className={twMerge("w-full bg-foreground border-foreground border-6")}
        >
          <input
            value={inputPath}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleGo()}
            className="w-full bg-foreground text-background text-sm md:text-[16px] font-bold outline-none px-1 md:px-2 md:py-1"
          />
        </div>
      </div>

      <div
        className={twMerge(
          "w-full h-auto p-10 bg-foreground",
          "flex flex-col justify-center items-center"
        )}
      >
        <div>
          <span
            className={twMerge(
              "font-error font-bold text-6xl md:text-8xl text-background tracking-widest"
            )}
          >
            404
          </span>

          <div className="space-y-2 mt-2">
            <p
              className={twMerge(
                "font-error font-bold text-[8px] md:text-sm text-background tracking-widest"
              )}
            >
              OOPS...
            </p>

            <p
              className={twMerge(
                "font-error font-bold text-[8px] md:text-sm text-background tracking-widest"
              )}
            >
              PAGE NOT FOUND
            </p>

            <Button
              title="Home"
              className={twMerge("bg-background hover:bg-background/90 px-10")}
              textStyle={twMerge(
                "text-foreground text-[8px] md:text-[14px] font-normal tracking-widest font-error"
              )}
              onClick={handleNavigation}
            />
          </div>
        </div>
      </div>
    </ErrorBody>
  );
};

export default ErrorState;
