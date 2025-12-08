export const pathAnimation = {
  animate: { pathLength: 1 },
  initial: { pathLength: 0 },
  variants: {
    hover: {
      pathLength: [0, 1],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },
};
