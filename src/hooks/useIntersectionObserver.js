import React, { useEffect, useRef } from "react";

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = 1.0,
  rootMargin = "200px",
}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentTarget = targetRef.current;

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [enabled, onIntersect, threshold, rootMargin]);

  return targetRef;
};
