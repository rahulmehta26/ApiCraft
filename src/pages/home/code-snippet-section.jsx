import { useState } from "react";
import { twMerge } from "tailwind-merge";
import CodeSample from "../../components/ui/code";
import CodeTerminal from "../../components/ui/code-terminal";
import { motion } from "motion/react";
import { parentAnimations } from "../../utils/parent-animation";

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
    <motion.section
      {...parentAnimations?.fadeInUp}
      id="code"
      className={twMerge("relative py-32")}>
      <div
        className={twMerge(
          "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem]",
          "absolute inset-0 "
        )}
      />

      <div className={twMerge("container mx-auto px-4", "relative z-10")}>
        <div className={twMerge("text-center mb-16 space-y-4")}>
          <h2
            className={twMerge(
              "font-bold font-comico text-4xl md:text-6xl text-balance"
            )}
          >
            Ready-to-Ship <span className={twMerge("gradient-text")}>Code</span>
          </h2>
          <p
            className={twMerge(
              "max-w-2xl mx-auto",
              "text-lg font-clash text-muted-foreground text-pretty"
            )}
          >
            Copy clean, optimized code with error handling and best practices
            built-in
          </p>
        </div>

        <CodeTerminal handleCopy={handleCopy} copied={copied}>
          <CodeSample />
        </CodeTerminal>

      </div>
    </motion.section>
  );
};

export default CodeSnippetSection;
