import "./Navbar.css";
import DownloadIcon from "../../assets/download.svg";

function Navbar() {
  return (
    <nav className="navbar">
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
    </nav>
  );
}

export default Navbar;
