"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ports the "Section fade in Animation" from main.js to React.
 *
 * Original vanilla JS observed every `.section` element globally and
 * removed the `section-fade` class the first time it scrolled into
 * view. Here, each section component owns its own observer via a ref,
 * which is more idiomatic in a component-based app and avoids relying
 * on a single global querySelectorAll(".section").
 *
 * Usage:
 *   const { ref, isVisible } = useSectionFade<HTMLElement>();
 *   <section ref={ref} className={`section ${isVisible ? "" : "section-fade"}`}>
 */
export function useSectionFade<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: null, threshold: 0 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}