import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/*
  Custom cursor for mouse users only — touch devices keep native behaviour.
  Any element can ask for a label with data-cursor="view" (or any word).
*/
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default");
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setEnabled(mq.matches);
      document.documentElement.classList.toggle("has-cursor", mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const labelled = e.target.closest("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor);
        return;
      }
      setMode(e.target.closest("a, button, [role='button'], input, label") ? "hover" : "default");
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "label" ? 96 : mode === "hover" ? 48 : 12;

  return (
    <motion.div
      aria-hidden="true"
      className={`cursor cursor--${mode}`}
      style={{ x: sx, y: sy }}
      animate={{ width: size, height: size, scale: down ? 0.8 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {mode === "label" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="cursor__label"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}
