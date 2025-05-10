// components/CompletionBanner.jsx
import React from "react";
import "./CompletionBanner.css"; // optional styling file

const CompletionBanner = ({ time, onNewPuzzle, onHome }) => {
  return (
    <div className="completion-banner">
      <h2>🎉 Puzzle Complete!</h2>
      <p>🕒 Time: {time}s</p>
      <div className="banner-buttons">
        <button onClick={onNewPuzzle}>New Puzzle</button>
        <button onClick={onHome}>Return to Menu</button>
      </div>
    </div>
  );
};

export default CompletionBanner;
