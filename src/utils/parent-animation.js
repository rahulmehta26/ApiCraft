export const parentAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20, rotate: 3, transformOrigin: "left center" },
    whileInView: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transformOrigin: "left center",
    },
    viewport: { once: true, amount: 0.2 },
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 12,
      duration: 0.5,
      staggerChildren: 0.12,
    },
  },
};
