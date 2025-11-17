import { useState } from "react";
import { sampleData } from "../../content/preview";
import Button from "../../components/ui/button";
import { twMerge } from "tailwind-merge";

const Preview = () => {
  const [viewMode, setViewMode] = useState("cards");

  return (
    <section id="preview" className="relative py-32 bg-muted/30 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-bold text-4xl md:text-6xl text-balance">
            Visual  <span className={twMerge("gradient-text")}>Data Preview</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Visualize your API responses in stunning, animated cards
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center gap-4">
            <Button
              className={twMerge(
                viewMode === "cards"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background  text-foreground",
                "border-4 hover:text-background border-foreground "
              )}
              title="Card View"
              onClick={() => setViewMode("cards")}
            />

            <Button
              className={twMerge(
                viewMode === "json"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background  text-foreground",
                "border-4 hover:text-background border-foreground "
              )}
              title="Raw JSON"
              onClick={() => setViewMode("json")}
            />
          </div>

          {/* Preview content */}
          {viewMode === "cards" ? (
            <div className="grid md:grid-cols-2 gap-6">
              {sampleData?.map((item, index) => (
                <div
                  key={index}
                  className={twMerge(
                    "border-4 border-foreground bg-card p-6 neo-shadow-hover",
                    "animate-in fade-in slide-in-from-bottom-4"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-xs border-2 border-foreground bg-muted px-2 py-1 font-mono">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground font-mono">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-4 border-foreground bg-card p-6 neo-shadow">
              <pre className="font-mono text-sm text-foreground overflow-x-auto">
                <code>
                  {JSON.stringify(
                    {
                      userId: "12345",
                      username: "johndoe",
                      email: "john@example.com",
                      active: true,
                    },
                    null,
                    2
                  )}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Preview;
