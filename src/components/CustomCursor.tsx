import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth > 768); // hide below 768px
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // skip if not desktop

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        typeof target.onclick === "function" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) setIsHidden(true);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseout", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isDesktop]);

  if (!isDesktop) return null; // hide cursor completely on mobile/tablet

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Cursor Ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          opacity: isHidden ? 0 : 1,
        }}
        animate={{ scale: isPointer ? 1.5 : 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 250 }}
      >
        <div className="relative" style={{ width: "32px", height: "32px" }}>
          <div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: "#FF6600",
              opacity: isPointer ? 0.6 : 0.4,
            }}
          />
        </div>
      </motion.div>

      {/* Cursor Dot */}
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
        animate={{ scale: isPointer ? 0.5 : 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      >
        <div
          className="rounded-full"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#FF6600",
            boxShadow: isPointer
              ? "0 0 20px rgba(255, 102, 0, 0.8)"
              : "0 0 10px rgba(255, 102, 0, 0.5)",
          }}
        />
      </motion.div>
    </>
  );
}
