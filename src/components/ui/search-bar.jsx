import { twMerge } from "tailwind-merge";
import Arrow from "../icons/arrow";
import { motion } from "motion/react";

const Input = ({ val, onChange, onSubmit }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          "w-full md:py-4 py-2 md:pl-8 pl-4",
          "md:text-2xl text-md font-semibold text-foreground",
          "md:placeholder:text-2xl placeholder:text-md placeholder:text-muted-foreground caret-foreground ",
          "outline outline-none"
        )}
      />

      <button
        className={twMerge(
          "h-full w-14 md:w-28 md:py-4 py-2",
          "bg-foreground cursor-pointer ",
          "flex justify-center items-center",
          "group"
        )}
        type="submit"
      >
        <motion.div
          whileTap={{ x: "var(--tap-x)" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Arrow className="stroke-background md:w-16 md:h-10 w-10 h-8 group-hover:scale-150 transition-all duration-300" />
        </motion.div>
      </button>
    </form>
  );
};

export default Input;
