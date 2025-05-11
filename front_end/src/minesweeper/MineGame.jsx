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
import axios from 'axios';

const MineGame = () => {
  // states for board settings
  const [difficulty, setDifficulty] = useState("easy");
  const [height, setHeight] = useState(8);
  const [width, setWidth] = useState(8);
  const [mines, setMines] = useState(10);
  // game-rlated state variables
  const [gameData, setGameData] = useState([]);
  const [gameStatus, setGameStatus] = useState("Game in progress");
  const [score, setScore] = useState(null);
  // used to force re-render when game settings changes
  const [key, setKey] = useState(false);
  // toggle top scores list
  const [showTopScores, setShowTopScores] = useState(false);
  // returns board settings based on selected difficulty
  const getBoardSettings = (level) => {
    switch (level) {
      case "medium":
        return { height: 12, width: 12, mines: 20 };
      case "hard":
        return { height: 16, width: 16, mines: 40 };
      // default is easy
      default:
        return { height: 8, width: 8, mines: 10 };
    }
  };
  // runs when difficulty changes, adjusting board settings accordingly
  useEffect(() => {
    const { height, width, mines } = getBoardSettings(difficulty);
    setGameStatus("Game in progress");
    setHeight(height);
    setWidth(width);
    setMines(mines);
    setScore(null);
    setKey(prev => !prev);
  }, [difficulty]);

  // effect hook that initializes game data whenever board settings change
  useEffect(() => {
    setGameData(initGameData(height, width, mines));
  }, [height, width, mines, key]);

  /* initializes new game
  - creates empty board
  - plants random mines around board
  - counts neighboring mines around cells
  */
  const initGameData = (height, width, mines) => {
    let data = createEmptyBoard(height, width);
    data = plantMines(data, height, width, mines);
    data = countNeighborMines(data, height, width);
    return data;
  };
  // reveals entire board when player wins or loses
  const revealBoard = () => {
    let updatedData = gameData.map(row => row.map(item => ({ ...item, isRevealed: true })));
    setGameData(updatedData);
  };

  // recursively reveals adjacent empty cells
  const revealEmptyCells = (y, x, data) => {
    let area = adjacentCells(y, x, data, height, width);
    area.forEach(value => {
      if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.y][value.x].isRevealed = true;
        if (value.isEmpty) {
          revealEmptyCells(value.y, value.x, data);
        }
      }
    });
    return data;
  };

  // calculates score based on nmber of revealed non-mine cells and win bonus
  const calculateScore = (data, isWin = false) => {
    const revealedNonMines = filterCellsByType(data, item => item.isRevealed && !item.isMine);
    let baseScore = revealedNonMines.length;
    if (isWin) {
      const bonus = difficulty === "easy" ? 100 : difficulty === "medium" ? 200 : 300;
      baseScore += bonus;
    }
    return baseScore;
  };

  // sae final score to backend via an API POST request
  const saveScore = async (finalScore, difficulty) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/minewordle/user_top_scores/',
        // data to be sent in request body
        { score: finalScore, difficulty },
        {
          headers: {
            // add token from localStorage for authentication
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Score saved:', response.data);
    } catch (err) {
      console.error('Failed to save score:', err);
    }
  };

  // handles left-click (reveal cell or end game if mine clicked)
  const handleCellClick = (y, x) => {
    if (gameStatus !== "Game in progress") return;
    if (gameData[y][x].isRevealed || gameData[y][x].isFlagged) return;

    if (gameData[y][x].isMine) {
      const updatedData = gameData.map(row => row.map(cell => ({ ...cell })));
      updatedData[y][x].isRevealed = true;
      revealBoard();
      const finalScore = calculateScore(updatedData, false);
      setScore(finalScore);
      setGameStatus("You Lost.");
      saveScore(finalScore, difficulty);
      return;
    }

    let updatedData = [...gameData];
    updatedData[y][x].isRevealed = true;
    updatedData[y][x].isFlagged = false;
    if (updatedData[y][x].isEmpty) {
      updatedData = revealEmptyCells(y, x, updatedData);
    }

    // check if game is won (all non-mine cells revealed)
    const unrevealed = filterCellsByType(updatedData, cell => !cell.isRevealed);
    if (unrevealed.length === mines) {
      revealBoard();
      const finalScore = calculateScore(updatedData, true);
      setScore(finalScore);
      setGameStatus("You Win!");
      saveScore(finalScore, difficulty);
    }

    setGameData(updatedData);
  };

  // handles right click to flag or unflag a cell
  const handleContextMenu = (e, y, x) => {
    e.preventDefault();
    if (gameData[y][x].isRevealed || gameStatus !== "Game in progress") return;

    let updatedData = [...gameData];
    updatedData[y][x].isFlagged = !updatedData[y][x].isFlagged;
    setGameData(updatedData);
  };

  // resets the game to start a new round
  const resetGame = () => {
    setGameStatus("Game in progress");
    setScore(null);
    setKey(prev => !prev);
  };

  /*
  - toggles user's top scores
  - difficulty and reset controls
  - game info (status, minecount, final score)
  - game board
  */
  return (
    <div className="game">
      <div className="controls">
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setShowTopScores(prev => !prev)}>
            {showTopScores ? 'Hide' : 'Show'} Top Scores
          </button>
          {showTopScores && <TopScores />}
        </div>
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
    </div>
  );
};

export default MineGame;
