import { useEffect, useState } from "react";
import "./../Styles/globalStyles.css";
import { SECONDS_PER_QUESTION } from "./../Utils/constants";


const CircularProgressBar = ({ secondsLeft }) => {
  const totalCircumference = 219.911; // Circumference of the circle (2 * Math.PI * r)
  const [strokeDashoffset, setStrokeDashoffset] = useState(totalCircumference);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setStrokeDashoffset(totalCircumference);
      return;
    }

    const progress = (secondsLeft / SECONDS_PER_QUESTION) * totalCircumference; // Assuming 30 is the max time
    setStrokeDashoffset(totalCircumference - progress);
  }, [secondsLeft]);

  return (
      <div className="circular-timer">
        <svg
          className="progress-ring w-20 h-20"
          viewBox="0 0 80 80"
        >
          <circle
            className="progress-ring__circle"
            stroke="blue"
            strokeWidth="5"
            fill="transparent"
            r="35"
            cx="40"
            cy="40"
            style={{ strokeDashoffset }}
          />
        </svg>
        <div className="timer-text text-sm sm:text-base md:text-lg lg:text-xl">
          {secondsLeft}
        </div>
    </div>
  );
};

export default CircularProgressBar;
