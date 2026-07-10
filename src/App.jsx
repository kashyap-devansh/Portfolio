import { useState } from "react";
import { motion } from "framer-motion";

import Cursor from "./components/Cursor/Cursor.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Intro from "./components/Intro/Intro.jsx";
import WhatICanDO from "./components/WhatICanDo/WhatICanDo.jsx";
import Work from "./components/Work/Work.jsx";
import MyStack from "./components/MyStack/MyStack.jsx";
import Contact from "./components/Contact/contact-Hero.jsx";
import ContactCTA from "./components/Contact/ContactCTA.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";

import { Routes, Route } from "react-router-dom";
import AboutMe from "./pages/AboutMe/AboutMe.jsx";
import Projects from "./pages/Projects/Projects.jsx";

const App = () => {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("loaderShown");
  });

  const handleLoadingFinish = () => {
    sessionStorage.setItem("loaderShown", "true");
    setLoading(false);
  };

  const [cursorVariant, setCursorVariant] = useState("default");

  return (
    <>
      {loading && (
        <LoadingScreen
          onFinish={handleLoadingFinish}
        />
      )}

      <Cursor variant={cursorVariant} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar loading={loading} />
                <Hero loading={loading} />
                <Intro />
                <Work setCursorVariant={setCursorVariant} />
                <MyStack />
                <WhatICanDO />
                <Contact />
                <ContactCTA />
                <Footer />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <Navbar loading={loading} />
                <AboutMe />
              </>
            }
          />

          <Route
            path="/projects"
            element={
              <>
                <Navbar loading={loading} />
                <Projects setCursorVariant={setCursorVariant} />
                <Footer />
              </>
            }
          />
        </Routes>
      </motion.div>
    </>
  );
};

export default App;
