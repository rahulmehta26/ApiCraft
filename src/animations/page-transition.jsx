import { motion } from "motion/react";

const pageTransition = (Page) => {
  return function PageWithTransition(props) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <Page {...props} />
        </motion.div>

        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-foreground origin-bottom pointer-events-none z-[9999]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-foreground origin-top pointer-events-none z-[9999]"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </>
    );
  };
};

export default pageTransition;
