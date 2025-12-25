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

  card3DScroll: {
    initial: {
      opacity: 0,
      scale: 0.6,
      rotateX: 22,
      rotateY: -12,
      z: -400,
    },
    inView: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
    },
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
    viewport: {
      once: false,
      amount: 0.25,
    },
  },
};
