import { twMerge } from 'tailwind-merge'
import { features } from '../../content/features'

const Features = () => {
  return (
        <section id="feature" className="relative py-32 overflow-hidden">
      <div className={twMerge(
        "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem]",
        "absolute inset-0"
      )} />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-bold text-4xl md:text-6xl text-balance">
            Everything You Need to <span className={twMerge("gradient-text")}>Craft APIs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Four powerful features that transform how you work with APIs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={twMerge(
                  "border-4 border-foreground bg-card p-6 transition-all",
                  "neo-shadow-hover group cursor-pointer"
                )}
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center border-4 border-foreground bg-${feature.color} mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`h-7 w-7 text-${feature.color}-foreground`} />
                </div>

                <h3 className="font-bold font-mono text-xl mb-3 text-foreground">{feature.title}</h3>

                <p className="text-muted-foreground text-[0.9rem] leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features