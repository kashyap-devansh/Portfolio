import Background from "../../../assets/journey.png";
import "./Journey.css";

const Journey = () => {
  return (
    <div className="journey">
      <img src={Background} alt="" className="bg" />

      <div className="journey-content">

        <section className="journey-section">

          <div className="section-title">
            <p>Engineering Experience</p>
          </div>

          <div className="section-items">

            <div className="journey-card">
              <span>01</span>
              <h6>Curio — Interpreted Language</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>02</span>
              <h6>Ark — SQL Database Engine</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>03</span>
              <h6>Ledger — Inventory Management System</h6>
              <span>+</span>
            </div>

          </div>

        </section>

        <section className="journey-section">

          <div className="section-title">
            <p>Learning Journey</p>
          </div>

          <div className="section-items">

            <div className="journey-card">
              <span>01</span>
              <h6>Started with C/C++</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>02</span>
              <h6>Switched to Linux</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>03</span>
              <h6>Found my passion for Systems</h6>
              <span>+</span>
            </div>

          </div>

        </section>

        <section className="journey-section">

          <div className="section-title">
            <p>Achievements</p>
          </div>

          <div className="section-items">

            <div className="journey-card">
              <span>01</span>
              <h6>Made projects from Scratch</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>02</span>
              <h6>Thousands of Lines of Code</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>03</span>
              <h6>Open Source Enthusiast</h6>
              <span>+</span>
            </div>

          </div>

        </section>

      </div>
    </div>
  )
}

export default Journey
