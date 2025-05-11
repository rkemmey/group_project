// AboutMinejsx
// const AboutMine = () => {
  
//   return (
//     <div className="p-8 text-center">
//       <h2 className="text-4xl font-bold">AboutMine</h2>
//     </div>
//   );
// };

// export default AboutMine;
// AboutMinejsx
import React from 'react';

function AboutMine() {
    return (
        <div className="main-page-contents px-3 py-3">
          <h1 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>
            About Minesweeper
          </h1>
    
          {/* Introduction */}
          <div className="rounded p-3 mb-2">
            <p>
              Minesweeper is a classic single-player puzzle game centered around deduction, pattern recognition, and logical thinking. Your objective is to uncover all the safe squares—those without mines—without clicking on a mine, which ends the game. In this version, victory is achieved by flagging every square where a mine is.
            </p>
          </div>
    
          {/* How to Play */}
          <div className="bg-light rounded p-4 mb-3">
            <h3>How to Play</h3>
            <p>
              The game presents you with a grid of concealed squares, some of which contain hidden mines (bombs). Select from Easy (default), Medium, or Hard difficulties. Harder difficulties will increase the size of the grid and the number of mines.
            </p>
            <ul>
              <li>If it's a mine, the game ends immediately in a loss.</li>
              <li>If it's safe, it will either reveal a number indicating how many adjacent squares contain mines...</li>
              <li>...or an empty square, which often triggers a chain reaction, automatically revealing nearby safe squares until numbered squares stop the cascade.</li>
              <li>Flag the squares by right-clicking them and right-click those same squares again to remove a wrongly placed flag.</li>
            </ul>
          </div>
    
          {/* Strategies */}
          <div className="bg-light rounded p-4 mb-3">
            <h3>Minesweeper Strategies</h3>
            <p>
              As you reveal more of the board, you gather clues about where the   mines are located:
            </p>
            <ul>
              <li>Using the numbered hints and the layout of revealed tiles, try to deduce which covered tiles are safe to uncover and which are likely dangerous. </li>
              <li>Flagging suspected mines will also prevent you from accidentally clicking on a mine later.</li>
            </ul>
          </div>
        </div>
      );
};
export default AboutMine;