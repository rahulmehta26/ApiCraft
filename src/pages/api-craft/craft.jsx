import { useEffect, useMemo } from "react";
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

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["apiData", urls],
    queryFn: () => getApiData(urls),
    enabled: false,
  });

  const addToast = useToastStore((state) => state.addToast);

  const arrayToRender = useMemo(() => findFirstArray(data), [data]);

  useEffect(() => {
    if (isError && error) {
      let msg = error?.message || "An error occurred";
      msg = msg.replace(/^AxiosError:\s*/i, "");
      addToast(msg, "error");
      return;
    }

    if (!data) return;

    const validation = validateArrayData(arrayToRender);
    if (!validation.isValid) {
      addToast(validation.message, "info");
    }
  }, [data, isError, error, arrayToRender, addToast]);

  const handleSubmit = async () => {
    if (!urls.trim()) {
      addToast("Please enter something to craft", "info");
      return;
    }

    if (!isValidUrl(urls)) {
      addToast("Please enter a valid URL!", "error");
      return;
    }

    try {
      await refetch();
    } catch (error) {
      throw new Error(error);
    }
  };

  if (isLoading) return <Loader loading={isLoading} />;

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

        {arrayToRender ? (
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
