import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ArrowRight from "../../components/icons/arrowRight";
import { variants } from "../../content/heroVariant";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import { parentAnimations } from "../../utils/parent-animation";

const Hero = () => {

  const navigate = useNavigate();
  
  return (
    <motion.section {...parentAnimations?.fadeInUp} className={twMerge(
      "relative min-h-screen overflow-hidden pt-16",
      " flex items-center justify-center"
    )}>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 ">

          <div className="space-y-8 ">

            <h1 className="font-bold font-comico text-5xl md:text-7xl leading-tight text-balance">
              Craft APIs into{" "}
              <span className="relative inline-block">
                <span className={twMerge("gradient-text")}>
                  Code
                </span>
              </span>{" "}
              Instantly
            </h1>

            <p className="text-lg font-clash text-muted-foreground leading-relaxed max-w-xl text-pretty">
              Paste any API, choose your method, preview key data, and copy
              ready-to-use code in seconds. Transform APIs into production-ready
              code with zero configuration.
            </p>

            <Button
                className="py-3 font-extrabold"
                onClick={() => navigate("/craft")}
                title="Get Started"
                rightIcon={ArrowRight}
                righticon="group-hover:translate-x-2 transition-transform"
              />
          </div>

          <div className="relative space-y-8 hidden lg:block">
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
    </motion.section>
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
