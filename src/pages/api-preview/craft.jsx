import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { motion } from "motion/react";
import Input from "../../components/ui/search-bar";
import Code from "../../components/icons/code";
import CodeTerminal from "../../components/ui/code-terminal";
import CodeSample from "../../components/ui/code";
import Button from "../../components/ui/button";
import PreviewCard from "../../components/ui/api-preview-card";
import PreviewJSON from "../../components/ui/api-preview-json";
import Database from "../../components/icons/database";
import Grid from "../../components/icons/grid";
import { useQuery } from "@tanstack/react-query";
import { getApiData } from "../../utils/get-api-data";
import Globe from "../../components/icons/globe";
import Hexagon from "../../components/icons/hexagon";
import PromiseIcon from "../../components/icons/promise";
import AsyncIcon from "../../components/icons/async";
import Error from "../../components/ui/error";
import EmptyState from "../../components/ui/empty-state";
import { findFirstArray } from "../../utils/finding-array";
import Loader from "../../components/ui/loader";
import AiIcon from "../../components/icons/ai";
import { parentAnimations } from "../../utils/parent-animation";

const Craft = () => {
  const [urls, setUrls] = useState("");
  const [copied, setCopied] = useState(false);
  const [apiMethod, setApiMethod] = useState("fetch");
  const [promise, setPromise] = useState("promise");
  const [uiShow, setUiShow] = useState("cards");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apiData", urls],
    queryFn: () => getApiData(urls),
    enabled: false,
  });

  if (isLoading) return <Loader loading={isLoading} />;

  const arrayToRender = findFirstArray(data);

  const handleSubmit = async (href) => {
    if (!urls.trim()) {
      alert("Please enter a valid API URL!");
      return;
    }

    scrollToView(href);

    refetch();
  };

  const scrollToView = (href) => {
    const elem = document.getElementById(href);

    if (elem) {
      elem.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  const handleCopy = () => {
    // navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleApiMethod = () => {
    setApiMethod((prev) => (prev === "fetch" ? "axios" : "fetch"));
  };

  const togglePromise = () => {
    setPromise((prev) => (prev === "promise" ? "async" : "promise"));
  };

  const toggleUiShow = () => {
    setUiShow((prev) => (prev === "cards" ? "json" : "cards"));
  };

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

      <div className=" relative z-10">
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
            <div id="code-snippet" className="my-16 space-y-8 md:space-y-16 ">
              <div className=" flex flex-col md:flex-row justify-between gap-6 items-center ">
                <h2 className="text-2xl md:text-3xl font-mono font-bold flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" animate={true} />
                  Code Snippet
                </h2>

                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <Button
                    className={twMerge(
                      "bg-background  text-foreground hover:text-background",
                      "border-4 border-foreground px-10 "
                    )}
                    title={apiMethod === "fetch" ? "Axios" : "Fetch"}
                    leftIcon={apiMethod === "fetch" ? Globe : Hexagon}
                    onClick={toggleApiMethod}
                    hover={true}
                  />

                  <Button
                    className={twMerge(
                      "bg-background  text-foreground",
                      "border-4 hover:text-background border-foreground px-10 "
                    )}
                    title={promise === "async" ? "Promise" : "Async/Await"}
                    leftIcon={promise === "async" ? PromiseIcon : AsyncIcon}
                    onClick={togglePromise}
                    hover={true}
                    icon={
                      promise === "async" ? "text-yellow" : "text-secondary"
                    }
                  />
                </div>
              </div>

              <CodeTerminal
                handleCopy={handleCopy}
                copied={copied}
                apiMethod={apiMethod}
              >
                <CodeSample
                  url={urls}
                  apiMethod={apiMethod}
                  styleType={promise}
                />
              </CodeTerminal>
            </div>

            <div className=" my-16 space-y-8 md:space-y-16 ">
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
                    onClick={toggleUiShow}
                    leftIcon={AiIcon}
                    lefticon=" text-purple "
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
                    lefticon="dark:text-secondary text-primary"
                    hover={true}
                  />

                </div>
              </div>

              <div>
                {uiShow === "json" ? (
                  <PreviewJSON data={arrayToRender} />
                ) : (
                  <div
                    className={twMerge(
                      " grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 ",
                      "place-items-center gap-x-3 gap-y-8"
                    )}
                  >
                    {arrayToRender &&
                      arrayToRender
                        ?.slice(0, 5)
                        ?.map((item, index) => (
                          <PreviewCard key={index} data={item} />
                        ))}
                  </div>
                )}
              </div>
            </div>
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

        {isError && <Error error={isError} />}
      </div>
    </motion.section>
  );
};

export default Craft;
