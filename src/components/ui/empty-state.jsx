import { motion } from "motion/react";

const EmptyState = () => {
  return (
    <motion.div
      className="border-4 border-dashed border-foreground/50 bg-muted/30 p-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <div>
          <h3 className="text-3xl font-mono font-bold">Craft Your Code</h3>
          <p className="text-muted-foreground font-clash mt-2 max-w-xl">
            Paste any API URL above, choose Fetch or Axios, and watch as we
            craft beautifull code snippets and preview all your data fields
            instantly.
          </p>
        </div>
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <div className="border-4 font-mono border-foreground/30 bg-foreground text-background neo-shadow px-4 py-2 text-sm font-bold">
             Live Preview
          </div>
          <div className="border-4 font-mono border-foreground/30 bg-foreground text-background neo-shadow px-4 py-2 text-sm font-bold">
            Ui Preview Cards
          </div>
          <div className="border-4 font-mono border-foreground/30 bg-foreground text-background neo-shadow px-4 py-2 text-sm font-bold">
             Full JSON Fields
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
