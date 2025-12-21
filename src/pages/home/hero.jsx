import { motion } from "motion/react";
import ArrowRight from "../../components/icons/arrowRight";
import { variants } from "../../content/heroVariant";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import { preloadCraft } from "../api-craft/craft";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className={twMerge(
        "relative min-h-screen overflow-hidden pt-16",
        " flex items-center justify-center"
      )}
      id="hero"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-12 content-between gap-12 ">
          <motion.div
            className="space-y-8 col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className={twMerge("font-bold font-comico text-5xl md:text-7xl leading-tight text-balance")}>
              Peek Inside Your{" "}
              <span className="relative inline-block">
                <span className={twMerge("gradient-text")}>APIs</span>
              </span>{" "}
              Instantly
            </h1>

            <p
              className={twMerge(
                "md:text-lg text-xs md:max-w-2xl font-clash text-muted-foreground leading-loose text-pretty"
              )}
            >
              Paste any API and instantly preview beautiful data visualizations. <br/>
              Generate production-ready code in Fetch, Axios. <br/>
              Zero configuration required.
            </p>

              <Button
                className="py-3 font-extrabold"
                onClick={() => navigate("/craft")}
                title="Get Started"
                rightIcon={ArrowRight}
                onMouseEnter={() => preloadCraft()}
                rightIconStyle="group-hover:translate-x-2 transition-transform"
              />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative space-y-8 col-span-4 hidden lg:block">
            
            <PreviewCard className="absolute top-0 right-0" />
            <PreviewCard
              className="absolute top-[10rem] right-20"
              variant="code"
            />
            <PreviewCard
              className="absolute top-[19rem] right-10"
              variant="data"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PreviewCard = ({className, variant = "default" }) => {

  const selected = variants[variant];

  return (
    <div
      className={twMerge(
        "w-72 border-4 border-foreground bg-card p-4",
        "transition-all duration-500",
        "neo-shadow",
        className
      )}
    >
      <div className={twMerge("mb-3", "flex items-center gap-2")}>
        {selected.icon()}
        <span
          className={twMerge("font-bold font-mono text-sm text-foreground")}
        >
          {selected.title}
        </span>
      </div>
      {selected.content()}
    </div>
  );
};

export default Hero;
