import { useState, useEffect } from "react";
import Sparkles from "../../components/icons/sparkles";
import ArrowRight from "../../components/icons/arrowRight";
import { variants } from "../../content/heroVariant";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className={twMerge(
      "relative min-h-screen overflow-hidden pt-16",
      " flex items-center justify-center"
    )}>
      <div className={twMerge(
        "bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]",
        "absolute inset-0"
      )} />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className={twMerge(
              "border-4 border-primary bg-primary/10 px-6 py-3",
              "text-sm font-bold text-primary",
              "inline-flex"
            )}>
              API CRAFT
            </div>

            <h1 className="font-bold text-5xl md:text-7xl leading-tight text-balance">
              Craft APIs into{" "}
              <span className="relative inline-block">
                <span className={twMerge("gradient-text")}>
                  Code
                </span>
              </span>{" "}
              Instantly
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
              Paste any API, choose your method, preview key data, and copy
              ready-to-use code in seconds. Transform APIs into production-ready
              code with zero configuration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={"/craft"}
                className={twMerge(
                  "border-4 border-foreground h-14 px-8 transition-all",
                  "bg-primary hover:bg-primary/90",
                  "text-primary-foreground font-black font-mono text-lg ",
                  "flex items-center justify-center",
                  "neo-shadow-hover group"
                )}
              >
                Get Started
                <ArrowRight className={twMerge(
                  "ml-2 h-5 w-5",
                  "group-hover:translate-x-2 transition-transform"
                )} />
              </Link>
            </div>
          </div>

          <div className="relative h-[600px] space-y-8 hidden lg:block">
            <PreviewCard delay={0} className="absolute top-0 right-0" />
            <PreviewCard
              delay={0.2}
              className="absolute top-32 right-20"
              variant="code"
            />
            <PreviewCard
              delay={0.4}
              className="absolute top-64 right-10"
              variant="data"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const PreviewCard = ({ delay = 0, className = "", variant = "default" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const selected = variants[variant];

  return (
    <div
      className={twMerge(
        "w-72 border-4 border-foreground bg-card p-4",
        "transition-all duration-500",
        "neo-shadow",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={twMerge("mb-3", "flex items-center gap-2")}>
        {selected.icon()}
        <span className={twMerge("font-bold font-mono text-sm text-foreground")}>
          {selected.title}
        </span>
      </div>
      {selected.content()}
    </div>
  );
};

export default Hero;
