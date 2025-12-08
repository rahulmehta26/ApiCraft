import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { inViewAnimation } from "../../animations/inview-animation";

const Link = ({className}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className = {twMerge("icon", className)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path whileInView={inViewAnimation} d="M9 15l6 -6" />
      <motion.path whileInView={inViewAnimation} d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
      <motion.path whileInView={inViewAnimation} d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
    </motion.svg>
  );
};

export default Link;
