import { useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import Input from "../../components/ui/search-bar";
import { isValidUrl } from "../../services/api-service";
import EmptyState from "../../components/ui/empty-state";
import Loader from "../../components/ui/loader";
import { useToastStore } from "../../store/useToastStore";
import CodeSnippetSectionCraft from "./code-snippet-section-craft";
import PreviewSection from "./preview-section";
import { useCraftToggles } from "../../hooks/useCraftToggles";
import { checkIfApiHasData } from "../../utils/data-validators";
import { getArrayToRender } from "../../utils/ai-parsers";
import { parentAnimations } from "../../animations/parent-animation";
import { useCraftApi } from "../../hooks/useCraftApi";
import { useCraftAI } from "../../hooks/useCraftAI";
import { getUserFriendlyError, logError } from "../../utils/error-handlers";
import ScrollToTop from "../../components/ui/scroll-to-top";

export const preloadCraft = () => import("./craft");

const Craft = () => {
  const {
    urls,
    setUrls,
    copied,
    handleCopy,
    apiMethod,
    toggleApiMethod,
    promise,
    togglePromise,
    uiShow,
    toggleUiShow,
  } = useCraftToggles();

  const addToast = useToastStore((state) => state.addToast);

  const { data, isError, error, isFetching, fetchApi } = useCraftApi(urls);

  const {
    analyze,
    reset,
    isProcessing,
    datasets,
    selectedIndex,
    setSelectedIndex,
    isUsingAI,
  } = useCraftAI(addToast);

  const hasApiData = useMemo(() => checkIfApiHasData(data), [data]);

  const arrayToRender = useMemo(
    () => getArrayToRender(data, datasets, selectedIndex),
    [data, datasets, selectedIndex]
  );

  useEffect(() => {
    if (isError && error) {
      logError(error, "API Fetch", { url: urls });
      const userMessage = getUserFriendlyError(error, "API Fetch")
      addToast(userMessage, "error");
    }
  }, [isError, error, addToast]);

  const handleSubmit = async () => {
    if (!urls.trim())
      return addToast("Please enter something to craft", "info");

    if (!isValidUrl(urls))
      return addToast("Please enter a valid URL!", "error");

    try {
      reset();
      await fetchApi();
    } catch (error) {
      logError(error, "handleSubmit", { url: urls })
      const userMessage = getUserFriendlyError(error);
      addToast(userMessage, "error");
    }
  };

  const handleUseAI = () => {
    if (!data || !hasApiData) {
      addToast("API contains no usable data for analysis.", "warning");
      return;
    }

    analyze(data);
  };

  return (
    <section
      className={twMerge("relative min-h-screen overflow-hidden px-4 pt-32")}
    >
      <div
        className={twMerge(
          "bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]",
          "absolute z-0 inset-0"
        )}
      />

      <div className="relative z-10">
        <motion.div
          {...parentAnimations?.fadeInUp}
          className="text-start mb-16 space-y-12"
        >
          <h2 className="font-bold max-w-4xl font-comico text-4xl md:text-7xl leading-normal text-balance">
            Paste an API. Get Code.{" "}
            <span className="gradient-text">Preview All Data.</span>
          </h2>
        </motion.div>

        <motion.div {...parentAnimations?.fadeInUp}>
          <Input
            val={urls}
            onChange={(e) => setUrls(e.target.value)}
            onSubmit={handleSubmit}
          />
        </motion.div>

        {data && hasApiData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CodeSnippetSectionCraft
              url={urls}
              apiMethod={apiMethod}
              toggleApiMethod={toggleApiMethod}
              promise={promise}
              togglePromise={togglePromise}
              copied={copied}
              handleCopy={handleCopy}
            />
            <PreviewSection
              arrayToRender={arrayToRender || []}
              uiShow={uiShow}
              toggleUiShow={toggleUiShow}
              onUseAI={handleUseAI}
              isUsingAI={isUsingAI}
              aiDatasets={datasets}
              selectedDatasetIndex={selectedIndex}
              onDatasetChange={setSelectedIndex}
            />
          </motion.div>
        ) : (
          <>
            <EmptyState />
          </>
        )}
        {(isFetching || isProcessing) && (
          <Loader
            message={isProcessing ? "AI is analyzing..." : "Fetching API..."}
          />
        )}
      </div>

      <ScrollToTop />
    </section>
  );
};

export default Craft;
