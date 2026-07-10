import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Cursor({ variant }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 500,
    damping: 25,
  });

  const smoothY = useSpring(y, {
    stiffness: 500,
    damping: 25,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${variant}`}
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {variant === "view" && "VIEW"}
    </motion.div>
  );
}
