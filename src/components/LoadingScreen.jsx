import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "こんにちは",
  "Hallo",
  "你好",
  "안녕하세요",
  "Ciao",
  "Olá",
  "Привет",
  "नमस्ते",
];

const STEP = 190;

export default function LoadingScreen({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= greetings.length - 1) {
          clearInterval(id);
          // Hold on the final "नमस्ते" so it can be read before the curtain lifts.
          setTimeout(() => setExit(true), 700);
          return i;
        }
        return i + 1;
      });
    }, STEP);
    return () => clearInterval(id);
  }, []);

  const progress = Math.round((index / (greetings.length - 1)) * 100);

  return (
    <motion.div
      className="loader"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={exit ? { clipPath: "inset(0 0 100% 0)" } : {}}
      transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
      onAnimationComplete={() => exit && onFinish()}
    >
      <div className="loader__top hud-label">
        <span>Devansh Kashyap</span>
        <span className="faint">Portfolio ©2026</span>
      </div>

      <motion.h1
        key={index}
        className="loader__word"
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.18 }}
      >
        <span className="loader__dot" />
        {greetings[index]}
      </motion.h1>

      <div className="loader__bottom">
        <span className="hud-label faint">Compiling portfolio</span>
        <span className="loader__count">{String(progress).padStart(3, "0")}</span>
      </div>
      <motion.div
        className="loader__bar"
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.25, ease: "linear" }}
      />
    </motion.div>
  );
}
