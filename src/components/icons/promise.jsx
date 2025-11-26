import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { inViewAnimation } from "../../utils/inview-animation";
import { pathAnimation } from "../../utils/path-animation";

const PromiseIcon = ({ className }) => {
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
      variants={{ hover: {} }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

 
      <motion.path
        whileInView={inViewAnimation}
        {...pathAnimation}
        d="M6.5 7h11"
      />

      <motion.path
        whileInView={inViewAnimation}
        {...pathAnimation}
        d="M6.5 17h11"
      />

      <motion.path
       whileInView={inViewAnimation}
       {...pathAnimation}
        d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z"
      />

      <motion.path
       whileInView={inViewAnimation}
       {...pathAnimation}
        d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z"
      />
    </motion.svg>
  );
};

export default PromiseIcon;
