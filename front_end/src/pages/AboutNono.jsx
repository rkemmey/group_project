import React from 'react';

function AboutNono() {
    return (
        <div className="main-page-contents px-3 py-3">
          <h1 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>
            About Nonograms
          </h1>
    
          {/* Introduction */}
          <div className="rounded p-3 mb-2">
            <p>
              Nonograms, also known as Picross puzzles or Griddlers, are a type of puzzle where you use logic to fill in a grid. The goal is to reveal a hidden picture by following numerical clues that describe how many filled cells should be in each row and column.
            </p>
          </div>
    
          {/* How to Play */}
          <div className="bg-light rounded p-4 mb-3">
            <h3>How to Play</h3>
            <p>
              Each nonogram puzzle consists of a grid with clues for each row and column. The numbers represent the length of consecutive blocks of filled cells. Here's how to solve a nonogram:
            </p>
            <ul>
              <li>Look at the row and column clues to determine where blocks of filled cells should be.</li>
              <li>Mark the filled cells and leave the others empty.</li>
              <li>Use the process of elimination to figure out where the remaining blocks go.</li>
            </ul>
            <p>
              For example, a clue of "4 1" for a row means that there is one block of 4 filled cells, and another block of 1 filled cell in that row.
            </p>
          </div>
    
          {/* Strategies */}
          <div className="bg-light rounded p-4 mb-3">
            <h3>Nonogram Strategies</h3>
            <p>Here are some helpful tips to solve nonograms more effectively:</p>
            <ul>
              <li><strong>Start with the biggest numbers:</strong> Focus on rows and columns with larger blocks first, as they provide more information.</li>
              <li><strong>Use the grid size:</strong> The size of the grid can help with placing clues. For example, a clue of "9" in a 10x10 grid must start at the first or last cell in the row or column.</li>
              <li><strong>Look for overlaps:</strong> When you place a filled block, look for overlap with the clues in adjacent rows and columns to make deductions.</li>
            </ul>
          </div>
    
          {/* Conclusion */}
          <div className="rounded p-3">
            <p>
              Nonograms are a great way to exercise your brain and have fun uncovering pixel art! With patience and practice, you'll get better at solving them faster and uncover more intricate pictures.
            </p>
          </div>
        </div>
      );
};
export default AboutNono;