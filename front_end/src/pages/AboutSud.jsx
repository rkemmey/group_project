import React from 'react';

function AboutSud() {
    return (
        <div className="main-page-contents px-3 py-3">
          <h1 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>
            About Sudoku
          </h1>
    
          {/* Introduction */}
          <div className="rounded p-3 mb-2">
            <p>
              Sudoku is a popular logic-based number puzzle. The goal of the game is to fill a 9x9 grid
              with digits from 1 to 9, ensuring that each number appears only once in each row, column,
              and 3x3 subgrid. Sudoku puzzles come in various levels of difficulty and are enjoyed by puzzle
              solvers of all ages.
            </p>
          </div>
    
          {/* How to Play */}
          <div className="bg-light rounded p-4 mb-3">
            <h3>How to Play</h3>
            <p>
              The puzzle starts with some cells pre-filled with numbers. Your job is to fill in the remaining
              cells using the numbers 1 to 9, making sure that each row, column, and subgrid (3x3) contains
              each number only once. Here are the basic steps:
            </p>
            <ul>
              <li>Look for rows, columns, or subgrids with only a few missing numbers.</li>
              <li>Use the process of elimination to figure out the possible numbers for each empty cell.</li>
              <li>Gradually fill in the puzzle while ensuring no duplicates appear in any row, column, or subgrid.</li>
            </ul>
          </div>
    
          {/* Strategies */}
          <div className="bg-light rounded p-4 mb-3">
            <h3>Sudoku Strategies</h3>
            <p>Here are some tips to improve your solving skills:</p>
            <ul>
              <li><strong>Start with easy numbers:</strong> Focus on filling in rows or columns with a lot of missing numbers.</li>
              <li><strong>Use pencil marks:</strong> Write down all possible numbers for an empty cell, then narrow them down.</li>
              <li><strong>Look for hidden pairs:</strong> Sometimes two cells in a row, column, or subgrid can only contain two specific numbers. These numbers can be eliminated from other cells in the same region.</li>
            </ul>
          </div>
    
          {/* Conclusion */}
          <div className="rounded p-3">
            <p>
              Whether you're a beginner or a seasoned player, Sudoku provides an excellent way to challenge your mind
              and improve logical thinking. Start solving puzzles today and enjoy hours of fun!
            </p>
          </div>
        </div>
      );
};
export default AboutSud;