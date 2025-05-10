import React from 'react';

function AboutTents() {
  return (
    <div className="main-page-contents px-3 py-3">
      <h1 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>
        About Tents
      </h1>

      <div className="rounded p-3 mb-2">
        <p>
          Tents is a grid-based logic puzzle where tents must be placed next to trees following specific rules.
        </p>
      </div>

      <div className="bg-light rounded p-4 mb-3">
        <h3>How to Play</h3>
        <p>
          The puzzle grid contains trees, and you must place one tent next to each tree. The number of tents in each row 
          and column is provided as a clue.
        </p>
        <ul>
          <li>Each tent must be orthogonally adjacent to exactly one tree.</li>
          <li>Tents cannot touch each other, not even diagonally.</li>
          <li>Row and column clues indicate how many tents are in each line.</li>
        </ul>
      </div>

      <div className="bg-light rounded p-4 mb-3">
        <h3>Tents Strategies</h3>
        <ul>
          <li><strong>Mark possibilities:</strong> Identify valid tent positions based on nearby trees.</li>
          <li><strong>Respect tent spacing:</strong> Tents can't be adjacent, so use that to eliminate options.</li>
          <li><strong>Use row/column clues:</strong> If a row has zero tents, mark it all grass; if it's full, place them.</li>
        </ul>
      </div>

      <div className="rounded p-3">
        <p>
          Tents puzzles are quick, fun, and perfect for developing logical deduction skills while enjoying a nature-inspired challenge.
        </p>
      </div>
    </div>
  );
}

export default AboutTents;
