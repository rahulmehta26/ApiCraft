import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { navItems } from "../../content/navbar";
import { scrollToView } from "../../utils/scroll-to-view";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(navItems[0]?.id);

  return (
    <nav
      className={twMerge(
        "text-md font-medium bg-blend-exclusion",
        "flex items-center gap-x-4 shrink-0",
        "hidden lg:flex"
      )}
    >
      {navItems?.map((item) => {
        return (
          <button
            key={item?.id}
            onClick={() => { setActiveTab(item?.id); scrollToView(item?.href)}}
            className={twMerge("relative cursor-pointer px-6 py-2")}
            type="button"
          >
            {activeTab === item?.id && (
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
            <span
              className={twMerge(
                "z-10 relative ",
                "font-bold font-mono text-[16px]",
                "mix-blend-exclusion ",
              )}
            >
              {item?.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
