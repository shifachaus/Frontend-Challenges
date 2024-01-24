import { useEffect, useState } from "react";
import { MAX, MIN } from "../constants";

const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(MAX, Math.max(value, MIN)));

    if (value >= MAX) {
      onComplete();
    }
  }, [value]);

  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "#fff" : "#000" }}>
        {percent.toFixed()}%
      </span>
      <div
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left",
        }}
        role="progressbar"
        aria-valuemax={MAX}
        aria-valuemin={MIN}
        aria-valuenow={percent.toFixed()}
      />
    </div>
  );
};

export default ProgressBar;
