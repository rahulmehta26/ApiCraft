import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { pathAnimation } from "../../animations/path-animation";
import { inViewAnimation } from "../../animations/inview-animation";

const Database = ({ className }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge("icon", className)}
      variants={{
        hover: {},
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0"
      />
      <motion.path whileInView={inViewAnimation} {...pathAnimation} d="M4 6v6a8 3 0 0 0 16 0v-6" />
      <motion.path whileInView={inViewAnimation} {...pathAnimation} d="M4 12v6a8 3 0 0 0 16 0v-6" />
    </motion.svg>
  );
};

export default Database;
