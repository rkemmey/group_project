//MineGame.jsx
import './minesweeper.css';
import { useState, useEffect } from 'react';
import GameInfo from './mine_components/GameInfo';
import Board from './mine_components/Board';
import TopScores from './mine_components/TopScores';
import {
  createEmptyBoard,
  plantMines,
  adjacentCells,
  countNeighborMines,
  filterCellsByType
} from './mine_components/mine_utilities';

const MineGame = () => {
  // difficlty settings, board dimesnsions, minecount
  const [difficulty, setDifficulty] = useState("easy");
  const [height, setHeight] = useState(8);
  const [width, setWidth] = useState(8);
  const [mines, setMines] = useState(10);
  // initializes game state
  const [gameData, setGameData] = useState([]);
  const [gameStatus, setGameStatus] = useState("Game in progress");
  const [score, setScore] = useState(0);
  // used to re-trigger useEffect to reset game
  const [key, setKey] = useState(false);
  // show user's top scores
  const [showTopScores, setShowTopScores] = useState(false);


  // sets height, width, and mine count based on difficulty
  const getBoardSettings = (level) => {
    switch (level) {
      case "medium":
        return { height: 12, width: 12, mines: 20 };
      case "hard":
        return { height: 16, width: 16, mines: 40 };
      default:
        return { height: 8, width: 8, mines: 10 };
    }
  };

  //when difficulty changes, update board settings and reset game
  useEffect(() => {
    const { height, width, mines } = getBoardSettings(difficulty);
    setGameStatus("Game in progress");
    setHeight(height);
    setWidth(width);
    setMines(mines);
    setScore(0);
    // toggle key to force reinit of gameData
    setKey(prev => !prev);
  }, [difficulty]);

  // when height, width, mines, or key changes, initialize the board
  useEffect(() => {
    setGameData(initGameData(height, width, mines));
  }, [height, width, mines, key]);

  // initializes gameboard: creates cells, places mines, counts neighboring mines
  const initGameData = (height, width, mines) => {
    let data = createEmptyBoard(height, width);
    data = plantMines(data, height, width, mines);
    data = countNeighborMines(data, height, width);
    return data;
  };

  // reveals all cells, win or lose
  const revealBoard = () => {
    let updatedData = gameData.map(row => row.map(item => ({ ...item, isRevealed: true })));
    setGameData(updatedData);
  };

  // recursively reveals adjacent empty (non-mine) cells
  const revealEmptyCells = (y, x, data) => {
    let area = adjacentCells(y, x, data, height, width);
    area.forEach(value => {
      if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.y][value.x].isRevealed = true;
        // continue revealing empty neighbors
        if (value.isEmpty) {
          revealEmptyCells(value.y, value.x, data);
        }
      }
    });
    return data;
  };

  // updates score bsaed on how many safe cells have been revealed
  const updateScore = (data) => {
    const revealedNonMines = filterCellsByType(data, item => item.isRevealed && !item.isMine);
    setScore(revealedNonMines.length);
  };

  // adds win bonus, scaled by difficulty
  const addWinBonus = () => {
    const bonus = difficulty === "easy" ? 100 : difficulty === "medium" ? 200 : 300;
    setScore(prev => prev + bonus);
  };

  // handles left-clicks on cell
  const handleCellClick = (y, x) => {
    if (gameData[y][x].isRevealed || gameData[y][x].isFlagged) return;
    // if user clicks on a mine, they lose
    if (gameData[y][x].isMine) {
      setGameStatus("You Lost.");
      revealBoard();
      return;
    }
    // clone the gaeme state and reveal the clicked cell
    let updatedData = [...gameData];
    updatedData[y][x].isRevealed = true;
    updatedData[y][x].isFlagged = false;
    // if the cell is empty, reveal its neighbors
    if (updatedData[y][x].isEmpty) {
      updatedData = revealEmptyCells(y, x, updatedData);
    }

    // check if won (only mines remain unrevealed)
    const unrevealed = filterCellsByType(updatedData, cell => !cell.isRevealed);
    if (unrevealed.length === mines) {
      setGameStatus("You Win!");
      addWinBonus();
      revealBoard();
    }

    setGameData(updatedData);
    updateScore(updatedData);
  };

  // handles right-cllck to toggle flag on cell
  const handleContextMenu = (e, y, x) => {
    e.preventDefault();
    if (gameData[y][x].isRevealed) return;

    let updatedData = [...gameData];
    updatedData[y][x].isFlagged = !updatedData[y][x].isFlagged;
    setGameData(updatedData);
  };

  // resets board while keeping current difficulty
  const resetGame = () => {
    setGameStatus("Game in progress");
    setScore(0);
    setKey(prev => !prev);
  };

  /*
  - difficulty and reset controls
  - game info (status, score, minecount)
  - game board
  */
  return (
    <div className="game">
      <div className="controls">
        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button className="reset-button" onClick={resetGame}>Reset</button>
      </div>
      <GameInfo score={score} gameStatus={gameStatus} mineCount={mines} />
      <Board
        data={gameData}
        handleCellClick={handleCellClick}
        handleContextMenu={handleContextMenu}
      />
       <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setShowTopScores(prev => !prev)}>
          {showTopScores ? 'Hide' : 'Show'} Top Scores
        </button>
        {showTopScores && <TopScores />}
      </div>
    </div>
  );
};

export default MineGame;