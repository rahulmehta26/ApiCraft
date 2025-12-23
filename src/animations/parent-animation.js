export const parentAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  fadeOutDown: {
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: "easeIn" },
  },

  staggerParent: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
    viewport: { once: true },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
