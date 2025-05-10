// instead of having every puzzle on the nav bar, we will just have a 
// "puzzle dashboard"  "profile" logout button and email once signed in
// check link urls for jason and mordi's games
import React from 'react';
import { Link } from 'react-router-dom';
import sudImg from '../assets/sud.png';
import nonoImg from '../assets/nono.png';
import kakuro from  '../assets/kakuro12.png';
import mines from  '../assets/minesweeper.png';
import tents from '../assets/tents.png';
import fifteen from '../assets/fifteen_puzzle.png';
import twoFour from '../assets/2048-game.png';
import wordle from '../assets/wordle.jpg';

function Dashboard() {
  return (
    <div className="container text-center my-2">
      
      <div className="rounded p-1 mb-2">
        <p className="mb-0 fw-semibold" style={{fontSize: '20px' }}>
      Click on a puzzle to start!
        </p>
      </div>

      <div className="row mb-3">
      <div className="col-md-3 mb-3">
        <Link to="/puzzle-15/" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">15 Tiles</h5>
                <img 
                  src={fifteen} 
                  style={{ width: '50%', height: 'auto' }} />
              <p className="card-text">
              Slide numbered tiles in a 4×4 grid to arrange them in ascending order with one empty space.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-3 mb-3">
        <Link to="/nonogram/" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">Nonogram</h5>
              <img 
                src={nonoImg} 
                style={{ width: '50%', height: 'auto' }} />
              <br></br>
              <p className="card-text">
              Use logic and numeric clues to shade the correct cells and reveal a pixel image.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-3 mb-3">
        <Link to="/minesweeper/" className="text-decoration-none text-dark"> 
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">Minesweeper</h5>
                <img 
                  src={mines} 
                  style={{ width: '50%', height: 'auto' }} />
              <p className="card-text">
              Uncover safe squares on a grid while using number clues to avoid hidden mines.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-3 mb-3">
        <Link to="/kakuro/new" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">Kakuro</h5>
                <img 
                  src={kakuro} 
                  style={{ width: '50%', height: 'auto' }} />
              <p className="card-text">
              Fill in blank cells with digits 1–9 so that each group sums to a clue number without repeats.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-3 mb-3">
        <Link to="/wordle/" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">Wordle</h5>
                <img 
                  src={wordle} 
                  style={{ width: '50%', height: 'auto' }} />
              <p className="card-text">
              Guess a hidden five-letter word in six tries, using color feedback to narrow down the answer.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-3 mb-3">
        <Link to="/2048/" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">2048</h5>
                <img 
                  src={twoFour} 
                  style={{ width: '50%', height: 'auto' }} />
              <p className="card-text">
              Slide and combine matching number tiles on a grid to reach the elusive 2048 tile.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-3 mb-3">
        <Link to="/tents/new" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">Tents</h5>
                <img 
                  src={tents} 
                  style={{ width: '50%', height: 'auto' }} />
              <p className="card-text">
              Place tents next to trees on a grid using clues for each row and column, ensuring no tents touch.
              </p>
            </div>
          </div>
        </Link>
      </div>

      
      <div className="col-md-3 mb-3">
        <Link to="/sudoku/" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">Sudoku</h5>
                <img 
                  src={sudImg} 
                  style={{ width: '50%', height: 'auto' }} />
              <p className="card-text">
              Fill a 9×9 grid so that each row, column, and 3×3 box contains the digits 1 through 9 exactly once.
              </p>
            </div>
          </div>
        </Link>
      </div>


    </div>      
    </div>
    
  );
}

export default Dashboard;
