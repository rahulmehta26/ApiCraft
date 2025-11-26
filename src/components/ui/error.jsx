import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import Exclamation from "../icons/exclamation";

const Error = ({ error }) => {
  return (
    <motion.div
      className={twMerge(
        "border-4 border-foreground my-10 p-4",
        "bg-background dark:bg-error",
        "text-foreground font-mono",
        "flex justify-start items-center gap-2"
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      >
          <Exclamation className="text-error dark:text-foreground" />
      <span>Error: {error}</span>
    </motion.div>
  );
};

export default Error;
