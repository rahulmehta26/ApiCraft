import { twMerge } from "tailwind-merge";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const PreviewJSON = ({ data }) => {
  if (!data) return null;

  const limitedData = limitData(data, 3);

  return (
    <div
      className={twMerge(
        "max-w-4xl mx-auto bg-card p-6 text-sm",
        "border-4 border-foreground",
        "overflow-auto neo-shadow"
      )}
    >
      <SyntaxHighlighter
        language="json"
        style={oneDark}
        wrapLines={true}
        showLineNumbers={true}      
      >
        {JSON.stringify(limitedData, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};

function limitData(data, limit = 3) {
  if (Array.isArray(data)) {
    const limited = data.slice(0, limit).map(item => limitData(item, limit));
    // Add indicator if there are more items
    if (data.length > limit) {
      limited.push(`... ${data.length - limit} more items`);
    }
    return limited;
  } else if (data !== null && typeof data === 'object') {
    const entries = Object.entries(data);
    const limitedEntries = entries.slice(0, limit);
    const result = Object.fromEntries(
      limitedEntries.map(([key, value]) => [key, limitData(value, limit)])
    );
    // Add indicator if there are more keys
    if (entries.length > limit) {
      result[`... ${entries.length - limit} more fields`] = "...";
    }
    return result;
  }
  return data;
}

export default PreviewJSON;