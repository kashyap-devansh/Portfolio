import { motion } from "framer-motion";
import "./Navbar.css";
import DownloadIcon from "../../assets/download.svg";

const Navbar = ({ loading }) => {
  return (
    <motion.nav className="navbar"
      initial={{ opacity: 0, y: -60 }}
      animate={
        loading ? { opacity: 0, y: -60 } : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
    >
      <span>Devansh</span>
      <div className="navbar-links">
        <a href="#">/BOUT ME</a>
        <a href="#">/LL PROJECTS</a>
        <a href="#">CONTACT</a>
      </div>

      <a href="#" target="_blank" rel="noopener noreferrer" className="resume">
        <span>Resume</span>
        <img src={DownloadIcon} alt="" className="download" />
      </a>
    </motion.nav>
  );
}

export default Navbar;
