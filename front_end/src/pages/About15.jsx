import React from 'react';

function About15Puzzle() {
  return (
    <div className="main-page-contents px-3 py-3">
      <h1 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>
        About 15 Tiles
      </h1>

      {/* Introduction */}
      <div className="rounded p-3 mb-2">
        <p>
          15 tiles is a classic sliding puzzle consisting of a 4x4 grid with 15 numbered tiles and one empty space.
          The goal is to arrange the tiles in numerical order by sliding them into the empty space.
        </p>
      </div>

      {/* How to Play */}
      <div className="bg-light rounded p-4 mb-3">
        <h3>How to Play</h3>
        <p>
          You can move any tile adjacent to the empty space into it. Continue sliding tiles until the numbers are arranged
          from 1 to 15, left to right and top to bottom.
        </p>
        <ul>
          <li>Only tiles next to the empty space can be moved.</li>
          <li>The solved state has tiles ordered from 1 to 15, with the blank in the bottom-right corner.</li>
          <li>Moves require planning — random sliding often makes the puzzle harder!</li>
        </ul>
      </div>

      {/* Strategies */}
      <div className="bg-light rounded p-4 mb-3">
        <h3>15-Puzzle Strategies</h3>
        <p>To solve more efficiently, try the following:</p>
        <ul>
          <li><strong>Solve row by row:</strong> Complete the first row, then the second, and so on.</li>
          <li><strong>Use cycles:</strong> Learn to rotate 3 tiles at a time without disrupting the rest.</li>
          <li><strong>Leave space for maneuvering:</strong> Use the empty tile wisely to control movement.</li>
        </ul>
      </div>

      {/* Conclusion */}
      <div className="rounded p-3">
        <p>
          15 tiles is a timeless test of logic and spatial awareness. Whether you're racing against time or solving at your
          own pace, it's a satisfying challenge to conquer!
        </p>
      </div>
    </div>
  );
}
export default About15Puzzle;
