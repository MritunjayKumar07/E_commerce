import React, { useEffect, useState } from "react";

const CountdownTimer = ({ initialTime, onTimeout }) => {
  const [countdown, setCountdown] = useState(initialTime);

  useEffect(() => {
    let interval;

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      onTimeout();
    }

    return () => {
      clearInterval(interval);
    };
  }, [countdown, onTimeout]);

  return `Countdown: ${Math.floor(countdown / 60)}:${countdown % 60}`;
};

export default CountdownTimer;
