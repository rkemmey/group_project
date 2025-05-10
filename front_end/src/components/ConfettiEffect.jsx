// components/ConfettiEffect.jsx
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiEffect = ({ run = true, duration = 3000 }) => {
  const [active, setActive] = useState(run);

  useEffect(() => {
    if (run) {
      setActive(true);
      const timeout = setTimeout(() => setActive(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [run, duration]);

  return active ? <Confetti recycle={false} numberOfPieces={300} /> : null;
};

export default ConfettiEffect;
