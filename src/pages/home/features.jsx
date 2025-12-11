import { twMerge } from "tailwind-merge";
import { features } from "../../content/features";
import { motion } from "motion/react";
import { parentAnimations } from "../../animations/parent-animation";

const Features = () => {
  return (
    <motion.section
      {...parentAnimations?.fadeInUp}
      id="feature"
      className="relative py-32 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-bold font-comico text-4xl md:text-6xl leading-normal text-balance">
            Everything You Need to{" "}
            <span className={twMerge("gradient-text")}>Peek Into APIs</span>
          </h2>
          <p className="text-lg font-clash text-muted-foreground max-w-2xl mx-auto text-pretty">
            Four powerful features that make API exploration effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={twMerge(
                  "border-4 border-foreground bg-card p-6 transition-all",
                  "neo-shadow-hover group cursor-pointer",
                  "flex flex-col text-center items-center"
                )}
              >
                <div
                  className={twMerge(
                    "h-14 w-14  border-4 border-foreground mb-4",
                    "group-hover:scale-110 transition-transform",
                    "inline-flex items-center justify-center ",
                    feature.color === 'primary' ? 'bg-primary' : 'bg-green-50'
                  )}
                >
                  <Icon
                    className={`h-7 w-7 text-${feature.color}-foreground`}
                  />
                </div>

                <h3 className="font-bold font-mono text-xl mb-3 text-foreground">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-xs font-clash leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
