import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { pathAnimation } from "../../animations/path-animation";
import { inViewAnimation } from "../../animations/inview-animation";

const LinkedIn = ({ className }) => {
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
        d="M8 11v5"
      />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M8 8v.01"
      />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M12 16v-5"
      />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M16 16v-3a2 2 0 1 0 -4 0"
      />
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"
      />
    </motion.svg>
  );
};

export default LinkedIn;
