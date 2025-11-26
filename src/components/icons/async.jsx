import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { pathAnimation } from "../../utils/path-animation";
import { inViewAnimation } from "../../utils/inview-animation";

const AsyncIcon = ({ className }) => {
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
        d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"
      />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M17 12a5 5 0 1 0 -5 5"
      />
    </motion.svg>
  );
};

export default AsyncIcon;
