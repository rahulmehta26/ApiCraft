import { twMerge } from "tailwind-merge";
import Check from "../icons/check";
import Copy from "../icons/copy";

const CodeTerminal = ({ children, handleCopy, copied, apiMethod = "fetch" }) => {

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={twMerge(
          "border-4 border-foreground bg-[#1e1e1e]",
          " neo-shadow-lg overflow-hidden"
        )}
      >
        {/* Code editor header */}
        <div
          className={twMerge(
            "border-b-4 border-foreground bg-[#2d2d2d] px-6 py-3",
            "flex items-center justify-between"
          )}
        >
          <div className="flex items-center gap-2">
            <div className={twMerge("threeDot", "bg-red")} />

            <div className={twMerge("threeDot", "bg-yellow")} />

            <div className={twMerge("threeDot", "bg-green")} />
          </div>

          <span className="font-mono text-sm text-muted-foreground">
            {
              apiMethod === "fetch" ? " api-fetch.js" : " api-axios.js"
           }
          </span>

          <button
            onClick={handleCopy}
            className={twMerge(
              "border-2 border-foreground px-4 py-2 transition-all",
              "bg-primary hover:bg-primary/90 ",
              "cursor-pointer text-primary-foreground font-bold text-sm ",
              "flex items-center gap-2"
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CodeTerminal;
