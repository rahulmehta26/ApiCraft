import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import CodeTerminal from "../../components/ui/code-terminal";
import CodeSample from "../../components/ui/code";
import Button from "../../components/ui/button";
import Code from "../../components/icons/code";
import Globe from "../../components/icons/globe";
import Hexagon from "../../components/icons/hexagon";
import PromiseIcon from "../../components/icons/promise";
import AsyncIcon from "../../components/icons/async";

const CodeSnippetSectionCraft = ({ 
  url, 
  apiMethod, 
  toggleApiMethod, 
  promise, 
  togglePromise, 
  copied, 
  handleCopy  }) => {

  return (
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
            icon={promise === "async" ? "text-yellow" : "text-secondary"}
          />
        </div>
      </div>

      <CodeTerminal
        handleCopy={handleCopy}
        copied={copied}
        apiMethod={apiMethod}
      >
        <CodeSample url={url} apiMethod={apiMethod} styleType={promise} />
      </CodeTerminal>
    </div>
  );
};

export default CodeSnippetSectionCraft;
