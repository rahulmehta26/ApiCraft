import { twMerge } from "tailwind-merge";
import {  motion } from "motion/react";
import { pathAnimation } from "../../utils/path-animation";
import { inViewAnimation } from "../../utils/inview-animation";

const Grid = ({ className }) => {
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
        d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"
      />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"
      />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"
      />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"
      />
    </motion.svg>
  );
};

export default Grid;
