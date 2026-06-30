import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Intro from "./components/Intro/Intro.jsx";
import WhatICanDO from "./components/WhatICanDo/WhatICanDo.jsx";
import Work from "./components/Work/Work.jsx";
import MyStack from "./components/MyStack/MyStack.jsx";
import Contact from "./components/Contact/contact-Hero.jsx";
import ContactCTA from "./components/Contact/ContactCTA.jsx";
import Footer from "./components/Footer/Footer.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Intro />
      <Work />
      <MyStack />
      <WhatICanDO />
      <Contact />
      <ContactCTA />
      <Footer />
    </div>
  )
}

export default App
