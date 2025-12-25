import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";
import AiIcon from "../../components/icons/ai";
import Grid from "../../components/icons/grid";
import Database from "../../components/icons/database";
import PreviewJSON from "../../components/ui/api-preview-json";
import PreviewCard from "../../components/ui/api-preview-card";
import Button from "../../components/ui/button";
import { parentAnimations } from "../../animations/parent-animation";
import AiSuggestionBanner from "./ai-suggestion-banner";
import { isRenderableCard } from "../../utils/is-renderable-card";
import { useInfiniteScrollPreview } from "../../hooks/useInfiniteScrollPreview";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import InfiniteLoadTrigger from "./infinite-load-trigger";

const PreviewSection = ({
  arrayToRender,
  uiShow,
  toggleUiShow,
  onUseAI,
  aiDatasets,
  selectedDatasetIndex,
  onDatasetChange,
}) => {
  const hasData = Array.isArray(arrayToRender) && arrayToRender.length > 0;

  const hasReadableStructure = hasData && arrayToRender.some(isRenderableCard);

  const showAiBanner = hasData && !hasReadableStructure;

  const hasMultipleDatasets = aiDatasets && aiDatasets?.datasets?.length > 1;

  const {
    allItems,
    totalItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteScrollPreview(arrayToRender, onUseAI);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage && uiShow === "cards") {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage && uiShow === "cards",
  });

  return (
    <motion.div
      {...parentAnimations?.fadeInUp}
      className=" my-16 space-y-8 md:space-y-16 "
    >
      <div className=" flex flex-col md:flex-row justify-between items-center gap-6 ">
        <h2 className="text-2xl md:text-3xl font-mono font-bold flex items-center gap-2">
          All Data Fields
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Button
            className={twMerge(
              "bg-background  text-foreground",
              "border-4 hover:text-background border-foreground px-10 "
            )}
            title="AI"
            onClick={onUseAI}
            leftIcon={AiIcon}
            leftIconStyle=" text-purple "
            hover={true}
          />

          <Button
            className={twMerge(
              "bg-background  text-foreground",
              "border-4 hover:text-background border-foreground px-10 "
            )}
            title={uiShow === "json" ? "Card View" : "RAW json"}
            onClick={toggleUiShow}
            leftIcon={uiShow === "json" ? Grid : Database}
            leftIconStyle="dark:text-secondary text-primary"
            hover={true}
          />
        </div>
      </div>

      {showAiBanner ? (
        <AiSuggestionBanner />
      ) : (
        <>
          {hasMultipleDatasets && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {aiDatasets.datasets.map((dataset, index) => (
                <button
                  key={index}
                  onClick={() => onDatasetChange(index)}
                  className={twMerge(
                    "px-6 py-3 border-4 border-foreground font-bold font-mono text-sm",
                    "neo-shadow-hover transition-all cursor-pointer",
                    selectedDatasetIndex === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:bg-muted"
                  )}
                >
                  <span className="font-bold">{dataset.label}</span>
                  <span className="ml-2 text-xs opacity-70">
                    ({dataset.count || dataset.data?.length || 0})
                  </span>
                </button>
              ))}
            </motion.div>
          )}
          <div>
            {uiShow === "json" ? (
              <PreviewJSON data={arrayToRender} />
            ) : (
              <>
                <motion.div
                  key={selectedDatasetIndex}
                  className={twMerge(
                    " columns-1 md:columns-2 lg:columns-3 xl:columns-4 ",
                    "gap-4"
                  )}
                  {...parentAnimations.staggerParent}
                >
                  <AnimatePresence mode="popLayout">
                    {allItems.map((item, index) => (
                      <motion.div
                        key={`${selectedDatasetIndex}-${index}`}
                        className="mb-8 break-inside-avoid flex justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <PreviewCard data={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                <InfiniteLoadTrigger
                  allItems={allItems}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  loadMoreRef={loadMoreRef}
                  totalItems={totalItems}
                />
              </>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default PreviewSection;
