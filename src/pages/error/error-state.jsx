import React from "react";
import ErrorBody from "./error-body";
import { twMerge } from "tailwind-merge";
import Minus from "../../components/icons/minus";
import Minimize from "../../components/icons/minimize";
import X from "../../components/icons/x";
import Warning from "../../components/icons/warning";
import Button from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const ErrorState = ({ onRetry, errorMessage }) => {
  const handleClose = () => {
    window.history.back();
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <ErrorBody>
      <div
        className={twMerge(
          "w-full bg-info",
          "py-1.5 md:py-3 px-4",
          "border-b-4 border-foreground",
          "flex justify-between items-center "
        )}
      >
        <span className={twMerge("font-error text-sm font-medium")}>ERROR</span>

        <div className={twMerge("flex gap-4 justify-center items-center")}>
          <Minus className="h-3 w-3 md:h-5 md:w-5" />
          <Minimize className="h-2.5 w-2.5 md:h-4 md:w-4" />
          <X
            onClick={() => handleClose()}
            className={twMerge(
              "h-3.5 w-3.5 md:h-5.5 md:w-5.5 text-background dark:text-foreground cursor-pointer"
            )}
          />
        </div>
      </div>

      <div
        className={twMerge(
          "w-full h-auto md:p-10 p-6 bg-background",
          "flex flex-col justify-center items-center"
        )}
      >
        <div className={twMerge(" flex justify-between gap-6 ")}>
          <Warning className=" text-yellow w-20 h-20 md:w-28 md:h-28 " />

          <div className=" space-y-2 ">
            <p
              className={twMerge("md:text-4xl text:2xl font-bold font-error ")}
            >
              Warning
            </p>

            <p
              className={twMerge(
                "md:text-[10px] text-[7px] font-light font-error leading-loose"
              )}
            >
              {errorMessage ||
                "This craft is under maintenance. Press Retry to respawn."}
            </p>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button
            title="Retry"
            className="md:px-8 px-4"
            onClick={handleRetry}
            textStyle="text-[8px] md:text-[14px] font-normal tracking-widest font-error"
          />
        </div>
      </div>
    </ErrorBody>
  );
};

export default ErrorState;
