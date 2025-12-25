import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { pathAnimation } from "../../animations/path-animation";
import { inViewAnimation } from "../../animations/inview-animation";

const ArrowUp = ({ className }) => {
  return (
    <motion.svg
      fill="#000000"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      enableBackground="new 0 0 52 52"
      xmlSpace="preserve"
      className={twMerge("icon", className)}
    >
      <motion.path
        {...pathAnimation}
        whileInView={inViewAnimation}
        d="M41.4,21c0.8-0.8,0.8-1.9,0-2.7l-15-14.7c-0.8-0.8-2-0.8-2.8,0L8.6,18.3c-0.8,0.8-0.8,1.9,0,2.7l2.8,2.7 c0.8,0.8,2,0.8,2.8,0l4.7-4.6c0.8-0.8,2.2-0.2,2.2,0.9v27c0,1,0.9,2,2,2h4c1.1,0,2-1.1,2-2V20c0-1.2,1.4-1.7,2.2-0.9l4.7,4.6 c0.8,0.8,2,0.8,2.8,0L41.4,21z"
      />
    </motion.svg>
  );
};

export default ArrowUp;
