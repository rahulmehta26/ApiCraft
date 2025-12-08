import { twMerge } from "tailwind-merge";
import Check from "../icons/check";
import Copy from "../icons/copy";
import Button from "./button";
import { TrafficLight } from "./traffic-light";

const CodeTerminal = ({
  children,
  handleCopy,
  copied,
  apiMethod = "fetch",
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={twMerge(
          "border-4 border-foreground bg-terminal",
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

          <TrafficLight />

          <span className="font-mono text-xs md:text-sm text-muted-foreground">
            {apiMethod === "fetch" ? " api-fetch.js" : " api-axios.js"}
          </span>

          <Button
            onClick={handleCopy}
            leftIcon={copied ? Check : Copy}
            title={copied ? "Copied" : "Copy"}
            className="bg-primary hidden md:flex hover:bg-primary/90"
            hover={true}
          />

          <div
          className=" md:hidden "
          >

          {copied ? (
            <button>
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleCopy} >
              <Copy className="w-4 h-4" />
            </button>
          )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CodeTerminal;
