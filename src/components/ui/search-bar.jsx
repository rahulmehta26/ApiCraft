import { twMerge } from "tailwind-merge";
import Arrow from "../icons/arrow";
import { motion } from "motion/react";

const Input = ({ val, onChange, onSubmit }) => {
  return (
    <div
      className={twMerge(
        "w-full",
        "border-6 border-foreground",
        "flex justify-between items-center"
      )}
    >
      <input
        type="url"
        value={val}
        onChange={onChange}
        placeholder="craft here..."
        className={twMerge(
          "w-full py-4 pl-8",
          "text-2xl font-semibold text-foreground",
          "placeholder:text-2xl placeholder:text-muted-foreground caret-foreground ",
          "outline outline-none"
        )}
      />

      <motion.button
        className={twMerge(
          "h-full w-28 py-4",
          "bg-foreground cursor-pointer ",
          "flex justify-center items-center",
          "group"
        )}
        whileTap={{
          x: 20,
        }}
        onClick={onSubmit}
      >
        <Arrow className=" stroke-background w-16 h-10 group-hover:scale-150 transition-all duration-300 " />
      </motion.button>
    </div>
  );
};

export default Input;
