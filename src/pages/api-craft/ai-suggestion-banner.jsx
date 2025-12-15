import { AnimatePresence, motion } from "motion/react";

const AiSuggestionBanner = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="border-4 border-warning bg-warning/10 p-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <span className="text-4xl shrink-0">⚠️</span>
          <div className="flex-1">
            <h3 className="font-bold text-lg font-mono text-foreground mb-2">
              Complex API Detected
            </h3>
            <p className="text-sm font-clash text-muted-foreground">
              Couldn't extract any data with normal function. Click the AI
              button for intelligent extraction.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiSuggestionBanner;
