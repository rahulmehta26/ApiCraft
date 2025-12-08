import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { navItems } from "../../content/navbar";
import Button from "./button";
import ArrowRight from "../icons/arrowRight";
import { useNavigate } from "react-router-dom";
import { scrollToView } from "../../utils/scroll-to-view";

const parentVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  closed: {},
};

const itemVariants = {
  closed: { opacity: 0, x: 50 },
  open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200 } },
};

const MobileMenu = ({ isOpen, toggleState }) => {
  const navigate = useNavigate();

  const getStarted = () => {
    navigate("/craft");
    toggleState();
  };

  const handleNavigation = (href) => {
    toggleState();
    scrollToView(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleState}
            className="fixed inset-0 bg-background/10 backdrop-blur md:hidden z-40"
          />

          <motion.div
            variants={parentVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-28 left-5 right-5 bottom-0 z-40 md:hidden"
          >
            <nav className="flex flex-col py-6 gap-4 flex-1">
              {navItems?.map((link) => (
                <motion.h3
                  key={link?.id}
                  onClick={() => handleNavigation(link?.href)}
                  variants={itemVariants}
                  className="text-lg font-medium text-foreground"
                >
                  {link?.title}
                </motion.h3>
              ))}
            </nav>

            <motion.div variants={itemVariants}>
              <Button
                className="py-3 font-extrabold"
                onClick={getStarted}
                title="Get Started"
                rightIcon={ArrowRight}
                righticon="group-hover:translate-x-2 transition-transform"
              />
            </motion.div>

            <div className="border-b-4 border-foreground my-10" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
