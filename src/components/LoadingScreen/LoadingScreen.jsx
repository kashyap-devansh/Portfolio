import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./LoadingScreen.css";

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
  "नमस्ते",
];

export default function LoadingScreen({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === greetings.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            setExit(true);
          }, 150);

          return prev;
        }

        return prev + 1;
      });
    }, 220);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      className="loading-screen"
      animate={exit ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.83, 0, 0.17, 1]
      }}
      onAnimationComplete={() => {
        if (exit) {
          onFinish();
        }
      }}
    >
      <h1 className="loading-text">
        {greetings[index]}
      </h1>
    </motion.div>
  );
}
