import { motion } from "motion/react";
import Button from "../../components/ui/button";
import { twMerge } from "tailwind-merge";

const InfiniteLoadTrigger = ({
  hasNextPage,
  loadMoreRef,
  isFetchingNextPage,
  fetchNextPage,
  allItems,
  totalItems,
}) => {
  return (
    <>
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-16">
          {isFetchingNextPage ? (
            <div className={twMerge("flex flex-col items-center gap-8 ")}>
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
                Loading More...
              </motion.span>
            </div>
          ) : (
            <Button onClick={() => fetchNextPage()} title="Loading more..." />
          )}
        </div>
      )}

      {!hasNextPage && allItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <p className={twMerge("text-sm font-mono text-muted-foreground")}>
            You've reached the end • {totalItems} items total
          </p>
        </motion.div>
      )}
    </>
  );
};

export default InfiniteLoadTrigger;
