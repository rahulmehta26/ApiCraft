import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { inViewAnimation } from "../../animations/inview-animation";

const Code = ({ className }) => {
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
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path whileInView= {inViewAnimation} d="M7 8l-4 4l4 4" />
      <motion.path whileInView= {inViewAnimation} d="M17 8l4 4l-4 4" />
      <motion.path whileInView= {inViewAnimation} d="M14 4l-4 16" />
    </motion.svg>
  );
};

export default Code;
