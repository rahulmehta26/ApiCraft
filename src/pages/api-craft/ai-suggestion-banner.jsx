import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import Minus from "../../components/icons/minus";
import Minimize from "../../components/icons/minimize";
import X from "../../components/icons/x";
import Warning from "../../components/icons/warning";

const AiSuggestionBanner = () => {
  return (
    <AnimatePresence>
      <motion.div
        className={twMerge(
          "md:w-[48rem] lg:w-4xl xl:w-7xl relative mx-auto ",
          "bg-transparent",
          "flex justify-center items-center",
          
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          className={twMerge(
            "w-[18rem] md:w-[35rem] h-auto",
            "border-foreground border-4 bg-[#2d2d2d]",
            "neo-shadow z-[999]"
          )}
        >
          <div
            className={twMerge(
              "w-full bg-info",
              "py-1.5 md:py-3 px-4",
              "border-b-4 border-foreground",
              "flex justify-between items-center "
            )}
          >
            <span className={twMerge("font-error text-sm font-medium")}>
              WARNING
            </span>

            <div className={twMerge("flex gap-4 justify-center items-center")}>
              <Minus className="h-3 w-3 md:h-5 md:w-5" />
              <Minimize className="h-2.5 w-2.5 md:h-4 md:w-4" />
              <X
                className={twMerge(
                  "h-3.5 w-3.5 md:h-5.5 md:w-5.5 text-background dark:text-foreground cursor-pointer"
                )}
              />
            </div>
          </div>

          <div className={twMerge(" flex justify-between gap-6 p-8 ")}> 
            <Warning className=" text-yellow w-20 h-20 md:w-28 md:h-28 " />

            <div className=" space-y-2 ">
              <p
                className={twMerge(
                  "md:text-4xl text:2xl font-bold font-error "
                )}
              >
                Warning
              </p>

              <h3
                className={twMerge(
                  "font-[500] text-lg font-error text-foreground mb-2"
                )}
              >
                Complex API Detected
              </h3>

              <p
                className={twMerge(
                  "md:text-[10px] text-[7px] font-light font-error leading-loose"
                )}
              >
                Couldn't extract any data with normal function. Click the AI
                button for intelligent extraction.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiSuggestionBanner;
