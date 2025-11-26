import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

const ArrowRight = ({className}) => {
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
        hover:{}
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path  d="M5 12l14 0" />
      <motion.path  d="M15 16l4 -4" />
      <motion.path  d="M15 8l4 4" />
    </motion.svg>
  );
};

export default ArrowRight;
