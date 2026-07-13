"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 48;
const HOTSPOT_X = 8;
const HOTSPOT_Y = 8;

const INTERACTIVE_SELECTOR = [
  "button:not(:disabled)",
  "a[href]",
  "[role='button']:not([aria-disabled='true'])",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "summary",
  ".mystic-interactive",
  "[data-mystic-interactive='true']",
].join(",");

export default function MysticCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [supportsCustomCursor, setSupportsCustomCursor] = useState(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    function updatePointerSupport() {
      setSupportsCustomCursor(finePointerQuery.matches);
    }

    updatePointerSupport();

    finePointerQuery.addEventListener("change", updatePointerSupport);

    return () => {
      finePointerQuery.removeEventListener("change", updatePointerSupport);
    };
  }, []);

  useEffect(() => {
    if (!supportsCustomCursor) return;

    function handlePointerMove(event: PointerEvent) {
      const cursor = cursorRef.current;

      if (!cursor) return;

      cursor.style.transform = `translate3d(
        ${event.clientX - HOTSPOT_X}px,
        ${event.clientY - HOTSPOT_Y}px,
        0
      )`;

      setIsVisible(true);

      const target =
        event.target instanceof Element
          ? event.target.closest(INTERACTIVE_SELECTOR)
          : null;

      setIsInteractive(Boolean(target));
    }

    function handlePointerLeave() {
      setIsVisible(false);
      setIsInteractive(false);
    }

    function handlePointerEnter() {
      setIsVisible(true);
    }

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );
    document.documentElement.addEventListener(
      "pointerenter",
      handlePointerEnter,
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      document.documentElement.removeEventListener(
        "pointerenter",
        handlePointerEnter,
      );
    };
  }, [supportsCustomCursor]);

  if (!supportsCustomCursor) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999]"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        opacity: isVisible ? 1 : 0,
        transform: `translate3d(-${CURSOR_SIZE}px, -${CURSOR_SIZE}px, 0)`,
        transition: "opacity 140ms ease",
        willChange: "transform",
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: isInteractive ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${
            isInteractive ? 1 : 0.65
          })`,
          background:
            "radial-gradient(circle, rgba(255, 208, 116, 0.38) 0%, rgba(202, 164, 106, 0.18) 38%, transparent 72%)",
          filter: "blur(4px)",
          transition:
            "opacity 180ms ease, transform 220ms ease, filter 220ms ease",
        }}
      />

      <span
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: isInteractive ? 0.72 : 0,
          boxShadow:
            "0 0 8px rgba(255, 214, 132, 0.85), 0 0 20px rgba(202, 164, 106, 0.58), 0 0 34px rgba(202, 164, 106, 0.28)",
          transition: "opacity 180ms ease",
        }}
      />

      <div
        className="relative h-12 w-12"
        style={{
          transform: `scale(${isInteractive ? 1.06 : 1})`,
          filter: isInteractive
            ? "drop-shadow(0 0 4px rgba(255, 215, 140, 0.9)) drop-shadow(0 0 10px rgba(202, 164, 106, 0.55))"
            : "none",
          transformOrigin: `${HOTSPOT_X}px ${HOTSPOT_Y}px`,
          transition: "filter 180ms ease, transform 180ms ease",
        }}
      >
        <Image
          src="/images/cursors/mystic-cursor-48.png"
          alt=""
          fill
          sizes="48px"
          draggable={false}
          className="select-none object-contain"
        />
      </div>
    </div>
  );
}