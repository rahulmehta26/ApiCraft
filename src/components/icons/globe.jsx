import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { pathAnimation } from "../../utils/path-animation";
import { inViewAnimation } from "../../utils/inview-animation";

const Globe = ({ className }) => {
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
      <motion.path whileInView={inViewAnimation} {...pathAnimation} d="M21 12a9 9 0 1 0 -9 9" />
      <motion.path whileInView={inViewAnimation} {...pathAnimation} d="M3.6 9h16.8" />
      <motion.path whileInView={inViewAnimation} {...pathAnimation} d="M3.6 15h8.4" />
      <motion.path whileInView={inViewAnimation} {...pathAnimation} d="M11.578 3a17 17 0 0 0 0 18" />
      <motion.path whileInView={inViewAnimation} {...pathAnimation} d="M12.5 3c1.719 2.755 2.5 5.876 2.5 9" />
      <motion.path whileInView={inViewAnimation} {...pathAnimation} d="M18 14v7m-3 -3l3 3l3 -3" />
    </motion.svg>
  );
};

export default Globe;
