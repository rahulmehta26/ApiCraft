import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

const navItems = [
  {
    id: 1,
    title: "Feature",
  },
  {
    id: 2,
    title: "Preview",
  },
  {
    id: 3,
    title: "Code",
  },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(navItems[0]?.id);

  const scrollToView = (href) => {
    const element = document.getElementById(href);

    if (element) {
      element?.scrollIntoView({
        behavior: "smooth",
        block:"start"
      })
    }
  };
  return (
    <nav
      className={twMerge(
        "text-md font-medium bg-blend-exclusion",
        "flex items-center gap-x-4 shrink-0",
        "hidden lg:flex"
      )}
    >
      {navItems?.map((items) => {
        return (
          <button
            key={items?.id}
            onClick={() => { setActiveTab(items?.id); scrollToView(items?.title?.toLowerCase())}}
            className={twMerge("relative cursor-pointer px-6 py-2")}
          >
            {activeTab === items?.id && (
              <motion.div
                transition={{
                  duration: 0.8,
                }}
                layoutId="active-pill"
                className={twMerge(
                  "bg-foreground neo-shadow neo-shadow-dark ",
                  "absolute inset-0 z-0"
                )}
              />
            )}
            <h1
              className={twMerge(
                "z-10 relative ",
                " font-bold font-mono text-[16px]",
                activeTab === items?.id
                  ? "text-neutral-100 "
                  : "text-neutral-900",
                "mix-blend-exclusion"
              )}
            >
              {items?.title}
            </h1>
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
