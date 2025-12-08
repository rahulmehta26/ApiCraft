import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

const ErrorBody = ({ children, className }) => {
  return (
    <motion.div
      className={twMerge(
        "min-h-screen  md:w-[48rem] lg:w-4xl xl:w-7xl relative mx-auto ",
        "bg-background",
        "flex justify-center items-center",
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div
        className={twMerge(
          "bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]",
          "absolute inset-0 pointer-events-none"
        )}
      />
      <div
        className={twMerge(
          "w-[18rem] md:w-[35rem] h-auto",
          "border-foreground border-4 bg-[#2d2d2d]",
          "neo-shadow z-[999]"
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default ErrorBody;
