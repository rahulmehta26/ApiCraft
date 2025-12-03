import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

const pageTransition = (Component) => {
  return () => (
    <>
      <Component />

      <motion.div
        className={twMerge(
          "fixed top-0 left-0",
          "w-[100%] h-[100%] bg-foreground",
          "origin-bottom"
        )}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        className={twMerge(
          "fixed top-0 left-0",
          "w-[100%] h-[100%] bg-foreground",
          "origin-top"
        )}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </>
  );
};

export default pageTransition;
