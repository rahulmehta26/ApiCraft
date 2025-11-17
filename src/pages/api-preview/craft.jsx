import { twMerge } from "tailwind-merge";
import Input from "../../components/ui/search-bar";
import { useState } from "react";
import Code from "../../components/icons/code";
import CodeTerminal from "../../components/ui/code-terminal";
import CodeSample from "../../components/ui/code";
import Button from "../../components/ui/button";
import PreviewCard from "../../components/ui/api-preview-card";
import PreviewJSON from "../../components/ui/api-preview-json";
import Database from "../../components/icons/database";
import Grid from "../../components/icons/grid";
import { useQuery } from "@tanstack/react-query";
import { getApiData } from "../../utils/getApiData";

const Craft = () => {
  const [urls, setUrls] = useState("");
  const [copied, setCopied] = useState(false);
  const [apiMethod, setApiMethod] = useState("fetch");
  const [promise, setPromise] = useState("then");
  const [uiShow, setUiShow] = useState("cards");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apiData", urls],
    queryFn: () => getApiData(urls),
    enabled: !!urls,
  });

  const handleSubmit = async () => {
    if (!urls.trim()) {
      alert("Please enter a valid API URL!");
      return;
    }
    refetch();
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
    setPromise((prev) => (prev === "then" ? "async" : "then"));
  };

  const toggleUiShow = () => {
    setUiShow((prev) => (prev === "cards" ? "json" : "cards"));
  };

  return (
    <section className={twMerge("relative min-h-screen overflow-hidden pt-32")}>
      <div
        className={twMerge(
          "bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]",
          "absolute z-0 inset-0"
        )}
      />

      <div className=" relative z-10">
        <div className="text-start mb-16 space-y-12">
          <h2 className="font-bold max-w-2xl text-4xl md:text-6xl text-balance">
            Paste an API. Get Code.{" "}
            <span className="gradient-text">Preview All Data</span>.
          </h2>
        </div>

        <div>
          <Input
            val={urls}
            onChange={(e) => setUrls(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="my-16 space-y-16 ">
          <div className=" flex justify-between items-center ">
            <h2 className="text-3xl font-mono font-bold flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Code Snippet
            </h2>

            <div className="flex justify-center gap-4">
              <Button
                className={twMerge(
                  "bg-background  text-foreground",
                  "border-4 hover:text-background border-foreground px-10 "
                )}
                title={apiMethod === "fetch" ? "Axios" : "Fetch"}
                onClick={toggleApiMethod}
              />

              <Button
                className={twMerge(
                  "bg-background  text-foreground",
                  "border-4 hover:text-background border-foreground px-10 "
                )}
                title={promise === "async" ? ".then" : "Async/Await"}
                onClick={togglePromise}
              />
            </div>
          </div>

          <CodeTerminal
            handleCopy={handleCopy}
            copied={copied}
            apiMethod={apiMethod}
          >
            <CodeSample url={urls} apiMethod={apiMethod} styleType={promise} />
          </CodeTerminal>
        </div>

        <div className=" my-16 - space-y-16 ">
          <div className=" flex justify-between items-center ">
            <h2 className="text-3xl font-mono font-bold flex items-center gap-2">
              All Data Fields
            </h2>

            <div>
              <Button
                className={twMerge(
                  "bg-background  text-foreground",
                  "border-4 hover:text-background border-foreground px-10 "
                )}
                title={uiShow === "json" ? "Card View" : "RAW json"}
                onClick={toggleUiShow}
                leftIcon={uiShow === "json" ? Grid : Database}
                icon="text-secondary"
              />
            </div>
          </div>

          <div>
            {uiShow === "json" ? (
              <PreviewJSON data={data} />
            ) : (
              <div
                className={twMerge(
                  " grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 ",
                  "place-items-center gap-x-3 gap-y-8"
                )}
              >
                {Array?.isArray(data) &&
                  data
                    ?.slice(0, 5)
                    ?.map((item, index) => (
                      <PreviewCard key={index} data={item} />
                    ))}

                {!Array?.isArray(data) && data && <PreviewCard data={data} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craft;
