import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import Input from "../../components/ui/search-bar";
import { getApiData } from "../../utils/get-api-data";
import EmptyState from "../../components/ui/empty-state";
import { findFirstArray } from "../../utils/finding-array";
import Loader from "../../components/ui/loader";
import { useToastStore } from "../../store/useToastStore";
import CodeSnippetSectionCraft from "./code-snippet-section-craft";
import PreviewSection from "./preview-section";
import { useCraftToggles } from "../../hooks/useCraftToggles";
import { isValidUrl } from "../../utils/url-valid-checker";
import { analyzeApiWithAI } from "../../utils/gemini";
import { checkIfApiHasData } from "../../utils/data-validators";
import { getArrayToRender } from "../../utils/ai-extractor";

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

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["apiData", urls],
    queryFn: () => getApiData(urls),
    enabled: false,
  });

  const addToast = useToastStore((state) => state.addToast);

  const hasApiData = useMemo(() =>  checkIfApiHasData(data), [data]);

   const arrayToRender = useMemo(() =>
    getArrayToRender(data, aiDatasets, selectedDatasetIndex), 
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
    if (!urls.trim()) return addToast("Please enter something to craft", "info");
      
    

    if (!isValidUrl(urls)) return addToast("Please enter a valid URL!", "error");
     

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
      addToast("AI is analyzing your API...", "info", 2000);

      const aiResult = await analyzeApiWithAI(data);
      console.log("AI Result:", aiResult);

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

  if (isLoading) return <Loader message="Fetching API..." />;
  if (isAIProcessing) return <Loader message="AI is analyzing..." />;

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-start mb-16 space-y-12"
        >
          <h2 className="font-bold max-w-4xl font-comico text-4xl md:text-7xl leading-normal text-balance">
            Paste an API. Get Code.{" "}
            <span className="gradient-text">Preview All Data.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
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
          <motion.section
            className="my-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <EmptyState />
          </motion.section>
        )}
      </div>
    </section>
  );
};

export default Craft;
