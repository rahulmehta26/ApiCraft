export const parentAnimations = {
  fadeInUp: {
    initial: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
    whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
