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
import { validateArrayData } from "../../utils/validate-array-data";
import { analyzeApiWithAI } from "../../utils/gemini";
import {checkIfApiHasData} from "../../utils/ai-data-extractor";

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

  const [aiData, setAiData] = useState(null);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [shouldSuggestAI, setShouldSuggestAI] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["apiData", urls],
    queryFn: () => getApiData(urls),
    enabled: false,
  });

  const addToast = useToastStore((state) => state.addToast);

  const normalArray = useMemo(() => findFirstArray(data), [data]);

  const arrayToRender = aiData || normalArray;
  const isUsingAI = !!aiData;

  useEffect(() => {
    if (isError && error) {
      let msg = error?.message || "An error occurred";
      msg = msg.replace(/^AxiosError:\s*/i, "");
      addToast(msg, "error");
      return;
    }

    if (!data) return;

    const validation = validateArrayData(normalArray);

    if (!validation.isValid) {
      const apiHasData = checkIfApiHasData(data);

      if (apiHasData) {
        setShouldSuggestAI(true);

        if (validation.reason === "empty") {
          addToast("Couldn't extract data. Try using AI!", "warning", );
        } else if (validation.reason === "too_many_undefined") {
          addToast(
            "Data quality is poor. AI can extract better!",
            "warning",
            
          );
        }
      } else {
        setShouldSuggestAI(false);
        addToast("This API returned no data.", "info");
      }
    } else {
      setShouldSuggestAI(false);
    }
  }, [data, isError, error, normalArray, addToast]);

  const handleSubmit = async () => {
    if (!urls.trim()) {
      addToast("Please enter something to craft", "info");
      return;
    }

    if (!isValidUrl(urls)) {
      addToast("Please enter a valid URL!", "error");
      return;
    }

    setAiData(null);
    setShouldSuggestAI(false);

    try {
      await refetch();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleUseAI = async () => {
    if (!data) {
      addToast("Please fetch an API first!", "warning");
      return;
    }

    try {
      setIsAIProcessing(true);
      addToast("AI is analyzing your API...", "info");

      const aiResult = await analyzeApiWithAI(data);

      if (aiResult.dataArray && aiResult.dataArray.length > 0) {
        setAiData(aiResult.dataArray);
        setShouldSuggestAI(false);
        addToast(
          `AI extracted ${aiResult.dataArray.length} items successfully!`,
          "success"
        );
      } else {
        addToast("AI couldn't extract data from this API.", "warning");
      }
    } catch (error) {
      console.error("AI Error:", error);
      addToast("AI analysis failed. Please try again.", "error");
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

        {data ? (
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
              arrayToRender={arrayToRender}
              uiShow={uiShow}
              toggleUiShow={toggleUiShow}
              onUseAI={handleUseAI}
              isUsingAI={isUsingAI}
              shouldSuggestAI={shouldSuggestAI}
              
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
