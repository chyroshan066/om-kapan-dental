"use client";

import { useEffect, useState } from "react";
import { CheckCircle, WarningCircle, X } from "@phosphor-icons/react";

export interface ToastData {
  type: "success" | "error";
  message: string;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
  /** Auto-dismiss delay in ms. */
  duration?: number;
}

export function Toast({ toast, onClose, duration = 5000 }: ToastProps) {
  const [isEntered, setIsEntered] = useState(false);
  const [barWidth, setBarWidth] = useState("100%");

  useEffect(() => {
    if (!toast) {
      setIsEntered(false);
      return;
    }

    // Start both animations one frame after mount, so the transition from
    // the initial state (opacity-0 / full-width bar) is actually visible
    // instead of jumping straight to the end state.
    setIsEntered(false);
    setBarWidth("100%");
    const raf = requestAnimationFrame(() => {
      setIsEntered(true);
      setBarWidth("0%");
    });

    const dismissTimer = setTimeout(onClose, duration);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(dismissTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, duration]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`fixed top-[12px] right-4 sm:right-6 z-[9999] w-[calc(100%-2rem)] max-w-sm transition-all duration-300 ${
        isEntered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
      role="alert"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-slate-400/20 overflow-hidden">
        <div className="flex items-start gap-x-3 p-4">
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 ${
              isSuccess
                ? "bg-emerald-100 text-emerald-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="w-5 h-5" weight="bold" />
            ) : (
              <WarningCircle className="w-5 h-5" weight="bold" />
            )}
          </div>
          <p className="flex-1 text-sm font-medium text-slate-800 pt-1.5">
            {toast.message}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-slate-400 transition-colors hover:bg-gray-100 hover:text-slate-600"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" weight="bold" />
          </button>
        </div>

        {/* Auto-dismiss progress bar */}
        <div className="h-1 w-full bg-gray-100">
          <div
            className={`h-full transition-[width] ease-linear ${
              isSuccess ? "bg-emerald-500" : "bg-red-500"
            }`}
            style={{ width: barWidth, transitionDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}