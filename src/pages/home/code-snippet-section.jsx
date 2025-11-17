import { useState } from "react";
import Copy from "../../components/icons/copy";
import Check from "../../components/icons/check";
import { twMerge } from "tailwind-merge";
import CodeSample from "../../components/ui/code";

const codeSnippet = `// Fetch API Example
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};`;

const CodeSnippetSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className={twMerge("relative py-32")}>
      <div className={twMerge(
        "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem]",
        "absolute inset-0 "
      )} />

      <div className={twMerge(
        "container mx-auto px-4",
        "relative z-10"
      )}>
        <div className={twMerge(
          "text-center mb-16 space-y-4"
        )}>
          <h2 className={twMerge(
            "font-bold text-4xl md:text-6xl text-balance"
          )}>
            Ready-to-Ship <span className={twMerge("gradient-text")}>Code</span>
          </h2>
          <p className={twMerge(
            "max-w-2xl mx-auto",
            "text-xl text-muted-foreground text-pretty"
          )}>
            Copy clean, optimized code with error handling and best practices
            built-in
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={twMerge(
            "border-4 border-foreground bg-[#1e1e1e]",
            " neo-shadow-lg overflow-hidden"
          )}>
            {/* Code editor header */}
            <div className={twMerge(
              "border-b-4 border-foreground bg-[#2d2d2d] px-6 py-3",
              "flex items-center justify-between"
            )}>
              <div className="flex items-center gap-2">
                <div className={twMerge("threeDot", "bg-red")} />

                <div className={twMerge("threeDot", "bg-yellow")} />

                <div className={twMerge("threeDot", "bg-green")} />
              </div>

              <span className="font-mono text-sm text-background">
                api-fetch.ts
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

            <CodeSample />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeSnippetSection;
