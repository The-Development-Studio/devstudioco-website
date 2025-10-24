import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const { isDarkMode } = useTheme();

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring config for smooth, natural movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.onclick !== null ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    // Add event listeners
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Cursor Ring - Larger outer circle */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 250,
        }}
      >
        <div
          className="relative"
          style={{
            width: "32px",
            height: "32px",
          }}
        >
          <div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: isDarkMode ? "#FF6600" : "#FF6600",
              opacity: isPointer ? 0.6 : 0.4,
            }}
          />
        </div>
      </motion.div>

      {/* Cursor Dot - Small center dot */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: isDarkMode ? "#FF6600" : "#FF6600",
            boxShadow: isPointer
              ? "0 0 20px rgba(255, 102, 0, 0.8)"
              : "0 0 10px rgba(255, 102, 0, 0.5)",
          }}
        />
      </motion.div>
    </>
  );
}
