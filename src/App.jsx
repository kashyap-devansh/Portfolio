import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Intro from "./components/Intro/Intro.jsx";
import Work from "./components/Work/Work.jsx";
import Contact from "./components/Contact/contact-Hero.jsx";
import ContactCTA from "./components/Contact/ContactCTA.jsx";

const App = () => {
  return (
    <div>
      <Hero />
      <Navbar />
      <Intro />
      <Work />
      <Contact />
      <ContactCTA />
    </div>
  )
}

export default App
