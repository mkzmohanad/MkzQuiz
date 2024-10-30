import { useState, useEffect } from "react";

export function useTimer(initialSeconds, resetTrigger, isActive) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [resetTrigger, initialSeconds]);

  useEffect(() => {
    if (!isActive || seconds <= 0) return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  return seconds;
}
