"use client";

import { RefObject, useEffect, useState } from "react";

export const useIsBottomVisible = (
  ref: RefObject<HTMLDivElement | null>,
  threshold = 0
) => {
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const isVisible =
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.top >= 0;
        setIsBottomVisible(isVisible);
      },
      { threshold }
    );
    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [ref, threshold]);

  return isBottomVisible;
};
