import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { codeSnippets } from "../../utils/code-snippet";

const CodeSample = ({
  url = "https://api.example.com/users",
  apiMethod = "fetch", 
  styleType = "async", 
}) => {

   const codeString = codeSnippets[apiMethod]?.[styleType]?.(url) || "";

  return (
    <div className="p-3 md:p-6 overflow-x-auto bg-terminal">
      <SyntaxHighlighter
        language="javascript"
        style={oneDark}
        customStyle={{
          padding: "1.5rem",
          borderRadius: "0.5rem",
          fontSize: "0.9rem",
          lineHeight: "1.6",
        }}
        wrapLines={true}
        showLineNumbers
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSample;
