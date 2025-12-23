import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "../../components/ui/search-bar";
import { getApiData, isValidUrl } from "../../services/api-service";
import EmptyState from "../../components/ui/empty-state";
import Loader from "../../components/ui/loader";
import { useToastStore } from "../../store/useToastStore";
import CodeSnippetSectionCraft from "./code-snippet-section-craft";
import PreviewSection from "./preview-section";
import { useCraftToggles } from "../../hooks/useCraftToggles";
import { checkIfApiHasData } from "../../utils/data-validators";
import { getArrayToRender } from "../../utils/ai-parsers";
import { analyzeApiWithAI } from "../../services/ai-service";
import { parentAnimations } from "../../animations/parent-animation";

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

  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiDatasets, setAiDatasets] = useState(null);
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState(0);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, error, isFetching } = useQuery({
    queryKey: ["apiData", urls],
    queryFn: () => getApiData(urls),
    enabled: false,
  });

  const addToast = useToastStore((state) => state.addToast);

  const hasApiData = useMemo(() => checkIfApiHasData(data), [data]);

  const arrayToRender = useMemo(
    () => getArrayToRender(data, aiDatasets, selectedDatasetIndex),
    [data, aiDatasets, selectedDatasetIndex]
  );

  const isUsingAI = !!aiDatasets;

  useEffect(() => {
    if (isError && error) {
      let msg = error?.message || "An error occurred";
      msg = msg.replace(/^AxiosError:\s*/i, "");
      addToast(msg, "error");
    }
  }, [isError, error, addToast]);

  const handleSubmit = async () => {
    if (!urls.trim())
      return addToast("Please enter something to craft", "info");

    if (!isValidUrl(urls))
      return addToast("Please enter a valid URL!", "error");

    await queryClient.cancelQueries({ queryKey: ["apiData"] });

    setAiDatasets(null);
    setSelectedDatasetIndex(0);

    try {
      await refetch();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleUseAI = async () => {
    if (!data || !hasApiData) {
      addToast("API contains no usable data for analysis.", "warning");
      return;
    }

    try {
      setIsAIProcessing(true);

      const aiResult = await analyzeApiWithAI(data);

      if (aiResult.datasets && aiResult.datasets.length > 0) {
        setAiDatasets(aiResult);
        setSelectedDatasetIndex(0);
        addToast(
          aiResult.datasets.length > 1
            ? `AI found ${aiResult.datasets.length} datasets! Use tabs to switch.`
            : `AI extracted ${aiResult.datasets[0].data.length} items!`,
          "success"
        );
      } else {
        addToast("AI couldn't extract data from this API.", "warning");
      }
    } catch (error) {
      if (
        error.message?.includes("quota exceeded") ||
        error.message?.includes("429")
      ) {
        addToast(
          "AI quota exceeded. Please wait and try again.",
          "error",
          5000
        );
      } else if (error.message?.includes("API key")) {
        addToast(
          "Invalid API key. Please check your Gemini API key.",
          "error",
          5000
        );
      } else {
        addToast(`AI analysis failed: ${error.message}`, "error");
      }
    } finally {
      setIsAIProcessing(false);
    }
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
              aiDatasets={aiDatasets}
              selectedDatasetIndex={selectedDatasetIndex}
              onDatasetChange={setSelectedDatasetIndex}
            />
          </motion.div>
        ) : (
          <>
            <EmptyState />
          </>
        )}
        {(isFetching || isAIProcessing) && (
            <Loader
              message={
                isAIProcessing ? "AI is analyzing..." : "Fetching API..."
              }
            />
        )}
      </div>
    </section>
  );
};

export default Craft;
