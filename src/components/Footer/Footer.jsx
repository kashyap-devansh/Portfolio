import "./Footer.css";
import footerImage from "../../assets/footer_bg.png"

const Footer = () => {
  return (
    <div className="footer">

      <div className="footer-content">
        <p>©2026 DEVANSH KASHYAP</p>

        <div className="nav-links">
          <div className="footer-links">
            <a href="/">
              <span>[</span>
              <span>/BOUT ME</span>
              <span>]</span>
            </a>
          </div>

          <div className="footer-links">
            <a href="/">
              <span>[</span>
              <span>/ALL PROJECTS</span>
              <span>]</span>
            </a>
          </div>

          <div className="footer-links">
            <a href="/">
              <span>[</span>
              <span>LET'S CONNECT</span>
              <span>]</span>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <a href="/">BACK TO TOP</a>
        </div>

      </div>

      <img src={footerImage} alt="Footer Image" />
    </div>
  )
}

export default Footer
