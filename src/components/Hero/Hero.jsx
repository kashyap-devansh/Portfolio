import "./Hero.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImage from "../../assets/hero-bg.png"

const Hero = ({ loading }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShow(entry.isIntersecting);
    });

    observer.observe(document.querySelector(".hero"));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">

      <div className="hero-content"
        style={{ display: show ? "block" : "none" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={
            loading ? { opacity: 0, y: 60 } : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          DEVΛNSH
          <br />
          KΛSHYΛP
        </motion.h1>

        <div className="hero-subtitle">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{
              duration: 0.8,
              delay: 1.3,
              ease: "easeOut",
            }}
          >
            Software Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{
              duration: 0.8,
              delay: 1.3,
              ease: "easeOut",
            }}
          >
            & Problem Solver
          </motion.p>
        </div>
      </div>

      <img src={heroImage} alt="" className="hero-image" />

    </section>
  );
};
export default Hero;
