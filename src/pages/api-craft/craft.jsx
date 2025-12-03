import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Input from "../../components/ui/search-bar";
import { getApiData } from "../../utils/get-api-data";
import EmptyState from "../../components/ui/empty-state";
import { findFirstArray } from "../../utils/finding-array";
import Loader from "../../components/ui/loader";
import { parentAnimations } from "../../utils/parent-animation";
import { useToastStore } from "../../store/useToastStore";
import { scrollToView } from "../../utils/scroll-to-view";
import CodeSnippetSectionCraft from "./code-snippet-section-craft";
import PreviewSection from "./preview-section";
import { useCraftToggles } from "../../hooks/useCraftToggles";
import pageTransition from "../../utils/page-transition";

const Craft = () => {
  
  const { urls, setUrls } = useCraftToggles();
  const addToast = useToastStore((state) => state.addToast);

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["apiData", urls],
    queryFn: () => getApiData(urls),
    enabled: false,
  });

  const arrayToRender = findFirstArray(data);

  useEffect(() => {
    if (isError && error) {
      addToast(error?.message || "An error occurred", "error");
      return; 
    }

    if (!data) return;

    if (!arrayToRender) {
      addToast("No data found.", "info");
    } else if (Array.isArray(arrayToRender) && arrayToRender.length === 0) {
      addToast("No data found.", "info");
    } else if (
      typeof arrayToRender === "object" &&
      Object.keys(arrayToRender).length === 0
    ) {
      addToast("No details available.", "info");
    }
  }, [data, isError, error, arrayToRender, addToast]);

  const handleSubmit = async (href) => {
    if (!urls.trim()) {
      addToast("Please enter something to craft", "info");
      return;
    }

    scrollToView(href);
    refetch();
  };

  if (isLoading) return <Loader loading={isLoading} />;

  return (
    <motion.section
      {...parentAnimations?.fadeInUp}
      className={twMerge("relative min-h-screen overflow-hidden px-4 pt-32")}
    >
      <div
        className={twMerge(
          "bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]",
          "absolute z-0 inset-0"
        )}
      />

      <div className="relative z-10">
        <div className="text-start mb-16 space-y-12">
          <h2 className="font-bold max-w-4xl font-comico text-4xl md:text-7xl text-balance">
            Paste an API. Get Code.{" "}
            <span className="gradient-text">Preview All Data.</span>
          </h2>
        </div>

        <div>
          <Input
            val={urls}
            onChange={(e) => setUrls(e.target.value)}
            onSubmit={() => handleSubmit("code-snippet")}
          />
        </div>

        {arrayToRender ? (
          <>
            <CodeSnippetSectionCraft url={urls} />
            <PreviewSection arrayToRender={arrayToRender} />
          </>
        ) : (
          <motion.section
            className="my-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <EmptyState />
          </motion.section>
        )}
      </div>
    </motion.section>
  );
};

export default pageTransition(Craft);