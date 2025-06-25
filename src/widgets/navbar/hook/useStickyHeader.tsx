"use client";

import { RefObject, useState, useRef, useEffect } from "react";

export const useStickyHeader = (headerRef: RefObject<HTMLElement | null>) => {
  const [isSticky, setIsSticky] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const marker = document.createElement("div");
    marker.style.position = "relative";
    marker.style.top = "0";
    marker.style.height = "1px";
    marker.style.width = "100%";
    marker.style.pointerEvents = "none";
    document.body.prepend(marker);

    observer.current = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px" }
    );

    observer.current.observe(marker);
    return () => {
      if (observer.current) observer.current.disconnect();
      marker.remove();
    };
  }, [headerRef]);

  return isSticky;
};
