import { motion } from "motion/react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 backdrop-blur-xs">
      <div className="bg-background w-72 md:w-80 border-4 border-foreground p-12 neo-shadow">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="relative h-8 md:h-10 w-52 md:w-56 overflow-hidden border-4 border-foreground bg-transparent neo-shadow">
            <motion.div
              className="h-full bg-foreground"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <motion.span
            className="font-mono text-sm md:text-md tracking-widest text-foreground"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Decoding...
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
