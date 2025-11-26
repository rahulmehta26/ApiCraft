import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

const Button = ({ className, title, onClick, leftIcon: LeftIcon, lefticon,  hover = false, rightIcon: RightIcon, righticon }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };
  return (
    <motion.button
      layout
      className={twMerge(
        "px-6 py-3",
        "bg-foreground text-background font-bold font-mono",
        "cursor-pointer group",
        "hover:bg-foreground/90 neo-shadow-hover transition-all",
        "flex items-center justify-center gap-2 ",
        className
      )}
      onClick={handleClick}
      transition={{
        layout: { duration: 0.25, ease: "easeOut" },
      }}
      whileHover={hover ? "hover" : undefined} 
    >

      {LeftIcon && <LeftIcon className={twMerge(lefticon, "icon ")} />}

      <motion.span
        key={title} 
        initial={{ opacity: 0, x: -4 }} 
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 4 }} 
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="whitespace-nowrap"
      >
        {title}
      </motion.span>

      {RightIcon && <RightIcon className={twMerge(righticon, "icon ")} />}

    </motion.button>
  );
};

export default Button;
