import { useState } from "react";
import { motion } from "framer-motion";

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

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <LoadingScreen
          onFinish={() => setLoading(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: loading ? 0 : 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
      >
        <Navbar />
        <Hero />
        <Intro />
        <Work />
        <MyStack />
        <WhatICanDO />
        <Contact />
        <ContactCTA />
        <Footer />
      </motion.div>
    </>
  );
};

export default App; 
