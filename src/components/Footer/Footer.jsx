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
              <span>HOME</span>
              <span>]</span>
            </a>

          </div>
          <div className="footer-links">
            <a href="/about">
              <span>[</span>
              <span>/BOUT ME</span>
              <span>]</span>
            </a>
          </div>

          <div className="footer-links">
            <a href="/projects">
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
          <a
            onClick={() =>
              window.scrollTo({ top: 0, behaviour: "smooth" })
            }
          >
            BACK TO TOP
          </a>
        </div>

      </div>

      <img src={footerImage} alt="Footer Image" />
    </div>
  )
}

export default Footer
