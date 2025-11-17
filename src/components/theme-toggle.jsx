import { motion, AnimatePresence } from "motion/react";
import { twMerge } from "tailwind-merge";
import Sun from "./icons/sun";
import Moon from "./icons/moon";
import { useEffect, useState } from "react";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <motion.div
      onClick={toggleTheme}
      className={twMerge(
        "bg-background border-4 border-foreground cursor-pointer",
        "neo-shadow-hover flex items-center justify-center p-2 w-12 h-12"
      )}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 360, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Moon className="icon" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 360, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Sun className="icon" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ThemeToggle;
