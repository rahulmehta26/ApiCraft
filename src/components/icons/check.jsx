import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

const Check = ({ className }) => {
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
      initial="hidden"
      whileInView="visible"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        d="M7 12l5 5l10 -10"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M2 12l5 5m5 -5l5 -5"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
      />
    </motion.svg>
  );
};

export default Check;
