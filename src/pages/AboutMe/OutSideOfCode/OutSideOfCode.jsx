import "./OutSideOfCode.css";

const OutSideOfCode = () => {
  return (
    <div className="outSideOfCode">
      <div className="outSideOfCode-content">
        <p>outSideOfCode</p>

        <div className="info">
          <div className="info-item">
            <h6 className="info-label">gaming :</h6>
            <div className="info-value">
              <div className="value gaming"></div>
            </div>
          </div>

          <div className="info-item">
            <h6 className="info-label">movies :</h6>
            <div className="info-value">
              <div className="value movies"></div>
            </div>
          </div>

          <div className="info-item">
            <h6 className="info-label">music :</h6>
            <div className="info-value">
              <div className="value music"></div>
            </div>
          </div>

          <div className="info-item">
            <h6 className="info-label">anime :</h6>
            <div className="info-value">
              <div className="value anime"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OutSideOfCode
