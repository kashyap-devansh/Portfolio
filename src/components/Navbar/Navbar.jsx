import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Navbar.css";
import DownloadIcon from "../../assets/download.svg";

const Navbar = ({ loading }) => {
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -60 }}
      animate={loading ? { opacity: 0, y: -60 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
    >
      <Link to="/" className="home-link-logo">
        <span>&lt;</span>
        <span>DevΛnsh</span>
        <span>&nbsp;/&gt;</span>
      </Link>

      <div className="navbar-links">
        <Link to="/about">/BOUT ME</Link>
        <Link to="/projects">/LL PROJECTS</Link>
        <Link to="/contact">CONTACT</Link>
      </div>

      <Link to="/resume" className="resume">
        <span>Resume</span>
        <img src={DownloadIcon} alt="Download Resume" className="download" />
      </Link>
    </motion.nav>
  );
};

export default Navbar;
