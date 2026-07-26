"use client";

import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;
    let removeTimeout: ReturnType<typeof setTimeout>;

    const handleLoad = () => {
      hideTimeout = setTimeout(() => setIsHidden(true), 2000);
      removeTimeout = setTimeout(() => setIsRemoved(true), 3000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div className={`preload-container${isHidden ? " preload-hidden" : ""}`}>
      <span className="preload"></span>
    </div>
  );
};