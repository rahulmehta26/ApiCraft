import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import AiIcon from "../../components/icons/ai";
import Grid from "../../components/icons/grid";
import Database from "../../components/icons/database";
import PreviewJSON from "../../components/ui/api-preview-json";
import PreviewCard from "../../components/ui/api-preview-card";
import Button from "../../components/ui/button";
import { parentAnimations } from "../../animations/parent-animation";

const PreviewSection = ({ arrayToRender, uiShow, toggleUiShow }) => {

  if (arrayToRender.length === 0) return null;

  return (
    <div className=" my-16 space-y-8 md:space-y-16 ">
      <div className=" flex flex-col md:flex-row justify-between items-center gap-6 ">
        <h2 className="text-2xl md:text-3xl font-mono font-bold flex items-center gap-2">
          All Data Fields
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Button
            className={twMerge(
              "bg-background  text-foreground",
              "border-4 hover:text-background border-foreground px-10 "
            )}
            title="AI"
            onClick={toggleUiShow}
            leftIcon={AiIcon}
            lefticon=" text-purple "
            hover={true}
          />

          <Button
            className={twMerge(
              "bg-background  text-foreground",
              "border-4 hover:text-background border-foreground px-10 "
            )}
            title={uiShow === "json" ? "Card View" : "RAW json"}
            onClick={toggleUiShow}
            leftIcon={uiShow === "json" ? Grid : Database}
            lefticon="dark:text-secondary text-primary"
            hover={true}
          />
        </div>
      </div>

      <div>
        {uiShow === "json" ? (
          <PreviewJSON data={arrayToRender} />
        ) : (
          <motion.div
            className={twMerge(
              " grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 ",
              "place-items-center gap-x-3 gap-y-8"
              )}
              {...parentAnimations.staggerParent}
          >
            {arrayToRender &&
              arrayToRender
                ?.slice(0, 5)
                ?.map((item, index) => <PreviewCard key={index} data={item} />)}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PreviewSection;
