import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";

import Cursor from "./components/Cursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import "./components/chrome.css";
import "./components/ProjectCard.css";

function firstVisit() {
  try {
    return !sessionStorage.getItem("loaderShown");
  } catch {
    return true;
  }
}

function NotFound() {
  return (
    <section className="container section" style={{ minHeight: "80svh", paddingTop: "30vh" }}>
      <p className="hud-label accent">404 — segmentation fault</p>
      <h1 className="display display-xl" style={{ marginTop: 24 }}>
        Nothing <span className="serif">here.</span>
      </h1>
      <Link to="/" className="btn btn--solid" style={{ marginTop: 40 }}>
        Back to index
      </Link>
    </section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(firstVisit);
  const { pathname } = useLocation();

  // Only sweep the curtain on real navigations, not right after the loader.
  const [prevPath, setPrevPath] = useState(pathname);
  const [navigated, setNavigated] = useState(false);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setNavigated(true);
  }

  const finish = () => {
    try {
      sessionStorage.setItem("loaderShown", "1");
    } catch {
      /* private mode — loader will just show again next visit */
    }
    setLoading(false);
  };

  const ready = !loading;

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {loading && <LoadingScreen onFinish={finish} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Navbar ready={ready} />

      {/* Keyed by route: each page enters behind a sweeping curtain. */}
      <motion.div key={pathname}>
        {navigated && (
          <motion.div
            className="curtain"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
            style={{ originY: 0 }}
          />
        )}
        <main>
          <Routes>
            <Route path="/" element={<Home ready={ready} />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </motion.div>
    </MotionConfig>
  );
}
