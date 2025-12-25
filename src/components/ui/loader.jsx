import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

const Loader = ({message = "Peeking inside..."}) => {
  return (
    <div className={twMerge(
      "bg-background/10 backdrop-blur-xs",
      "flex items-center justify-center",
      "fixed inset-0 z-50"
    )}>
      <div className={twMerge(
        "w-72 md:w-80 p-12",
        "bg-background border-4 border-foreground ",
        "neo-shadow"
      )}>
        <div className={twMerge("flex flex-col items-center justify-center gap-6")}>
          <div className={twMerge(
                "relative h-8 md:h-10 w-52 md:w-56",
                "border-4 border-foreground bg-transparent",
                "neo-shadow overflow-hidden"
              )}>
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
           className={twMerge("font-mono text-sm md:text-md tracking-widest text-foreground")}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
             {message}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
