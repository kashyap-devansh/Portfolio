import "./BackStory.css";

const BackStory = () => {
  return (
    <div className="backstory">
      <div className="backstory-content">
        <p>backstory</p>

        <div className="info">
          <div className="info-item">
            <h6 className="info-label">race:</h6>
            <h6 className="info-value">human</h6>
          </div>

          <div className="info-item">
            <h6 className="info-label">age:</h6>
            <h6 className="info-value">19</h6>
          </div>

          <div className="info-item">
            <h6 className="info-label">languages:</h6>
            <h6 className="info-value">hindi/english</h6>
          </div>

          <div className="info-item">
            <h6 className="info-label">finanical:</h6>
            <h6 className="info-value">broke</h6>
          </div>

          <div className="info-item">
            <h6 className="info-label">height</h6>
            <h6 className="info-value">classified</h6>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BackStory
