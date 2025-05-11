import React from 'react';

function About2048() {
  return (
    <div className="main-page-contents px-3 py-3">
      <h1 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>
        About 2048
      </h1>

      {/* Introduction */}
      <div className="rounded p-3 mb-2">
        <p>
          2048 is a sliding tile puzzle game where the objective is to combine tiles with the same number to reach
          the 2048 tile. It’s simple to learn but challenging to master, offering a mix of logic and strategy.
        </p>
      </div>

      {/* How to Play */}
      <div className="bg-light rounded p-4 mb-3">
        <h3>How to Play</h3>
        <p>
          Use arrow keys to slide all tiles in one direction. When two tiles with the same number collide,
          they merge into one with their combined value. The goal is to create a tile with the number 2048.
        </p>
        <ul>
          <li>All tiles move as far as possible in the direction you swipe.</li>
          <li>When two tiles with the same value collide, they merge into one.</li>
          <li>New tiles appear after each move, making the board progressively fuller.</li>
        </ul>
      </div>

      {/* Strategies */}
      <div className="bg-light rounded p-4 mb-3">
        <h3>2048 Strategies</h3>
        <p>Improve your chances with these tips:</p>
        <ul>
          <li><strong>Stick to one corner:</strong> Try to keep your highest tile in a fixed corner.</li>
          <li><strong>Don’t swipe up (often):</strong> Swiping up tends to disrupt the board layout early on.</li>
          <li><strong>Think ahead:</strong> Plan moves to avoid blocking merging opportunities.</li>
        </ul>
      </div>

      {/* Conclusion */}
      <div className="rounded p-3">
        <p>
          2048 is an addictive game that’s great for passing time while challenging your spatial reasoning and planning skills.
          See how high you can score!
        </p>
      </div>
    </div>
  );
}
export default About2048;
