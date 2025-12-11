import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import CheckCircle from "../../icons/check-circle";
import Exclamation from "../../icons/exclamation";
import Warning from "../../icons/warning";
import Info from "../../icons/info";
import { useCallback, useEffect, useRef } from "react";
import { useToastStore } from "../../../store/useToastStore";

const variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const Toast = ({ message, type, duration, id }) => {
  const removeToast = useToastStore((state) => state?.removeToast);

  const timerRef = useRef(null);
  const remainingRef = useRef(duration);
  const startRef = useRef(Date.now());

  const color = {
    success: "bg-green ",
    error: "bg-error",
    info: "bg-info",
    warning: "bg-warning",
    default: "bg-neutral-800",
  }[type];

  const Icon = {
    success: CheckCircle,
    error: Exclamation,
    info: Info,
    warning: Warning,
    default: "",
  }[type];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    startRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      removeToast(id);
    }, remainingRef.current);
  }, [id, removeToast, clearTimer]);

  const handleMouseEnter = () => {
    const elapsed = Date.now() - startRef.current;
    remainingRef.current -= elapsed;
    clearTimer();
  };

  const handleMouseLeave = () => {
    if (remainingRef.current > 0) startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer, clearTimer]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={twMerge(
        "border-4 border-foreground my-10 p-5 relative neo-shadow ",
        "flex justify-start items-center gap-4",
        color
      )}
    >
      <Icon className={twMerge("text-foreground")} />

      <span className={twMerge("text-background font-mono")}>{message}</span>
    </motion.div>
  );
};
