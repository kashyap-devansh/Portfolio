import "./Skills.css";
import Lock from "../../../assets/lock.svg";

const Skills = () => {
  return (
    <div className="skills">
      <div className="skills-content">
        <p>skills</p>

        <div className="info">
          <div className="info-item">
            <h6 className="info-label">coding :</h6>
            <div className="info-value">
              <div className="value coding"></div>
            </div>
          </div>

          <div className="info-item">
            <h6 className="info-label">linux :</h6>
            <div className="info-value">
              <div className="value linux"></div>
            </div>
          </div>

          <div className="info-item">
            <h6 className="info-label">curiosity :</h6>
            <div className="info-value">
              <div className="value curiosity"></div>
            </div>
          </div>

          <div className="info-item">
            <h6 className="info-label">teamwork :</h6>
            <div className="info-value">
              <div className="value teamwork"></div>
            </div>
          </div>

          <div className="info-item">
            <h6 className="info-label">yapping nonsense :</h6>
            <div className="info-value">
              <div className="value yapping"></div>
            </div>
          </div>

          <div className="box">
            <img src={Lock} alt="" className="lock" />
            <span>hire to unlock other ability</span>
          </div>
          <div className="dummy1"></div>
          <div className="dummy2"></div>
        </div>

      </div>
    </div>
  );
};

export default Skills;
