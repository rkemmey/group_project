import React from 'react';

function AboutKakuro() {
  return (
    <div className="main-page-contents px-3 py-3">
      <h1 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>
        About Kakuro
      </h1>

      <div className="rounded p-3 mb-2">
        <p>
          Kakuro puzzles are numeric crossword puzzles where you must fill white cells with digits from 1 to 9 
          so that their sums match the clues in the black cells, without repeating digits in any sequence.
        </p>
      </div>

      <div className="bg-light rounded p-4 mb-3">
        <h3>How to Play</h3>
        <p>
          Each white cell must contain a digit from 1 to 9. Numbers in black cells indicate the sum of values in adjacent 
          white cells, either to the right (horizontal) or below (vertical). Here's how to play:
        </p>
        <ul>
          <li>Each clue corresponds to a run of white cells either across or down.</li>
          <li>Each digit in a run must be unique.</li>
          <li>Use logic and elimination to determine valid digit combinations.</li>
        </ul>
      </div>

      <div className="bg-light rounded p-4 mb-3">
        <h3>Kakuro Strategies</h3>
        <ul>
          <li><strong>Use known combinations:</strong> Memorize or reference valid digit sets for common totals.</li>
          <li><strong>Eliminate options:</strong> Use overlaps and intersections to rule out impossible values.</li>
          <li><strong>Work from the edges:</strong> Start with rows or columns that have fewer possibilities.</li>
        </ul>
      </div>

      <div className="rounded p-3">
        <p>
          Kakuro offers a rewarding mix of arithmetic and logic. With practice, you’ll be solving even hard puzzles like a pro.
        </p>
      </div>
    </div>
  );
}

export default AboutKakuro;
