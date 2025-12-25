import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { twMerge } from "tailwind-merge";
import ArrowUp from "../icons/arrowUp";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 1500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className={twMerge(
            "fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999]",
            "w-12 h-12 md:w-14 md:h-14",
            "border-4 border-foreground bg-primary",
            "flex items-center justify-center",
            "neo-shadow-hover cursor-pointer",
            "text-primary-foreground"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
};

export default ScrollToTop;
