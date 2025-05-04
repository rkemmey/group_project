import './minesweeper.css';
import { useState, useEffect } from 'react';
import GameInfo from './mine_components/GameInfo';
import Board from './mine_components/Board';
import { createEmptyArray, plantMines, 
  traverseBoard, getNeighborMines, filterBoard
} from './mine_components/mine_utilities';

const Game = () => {
  // difficulty and board settings (default being easy)
  const [difficulty, setDifficulty] = useState("easy");
  const [height, setHeight] = useState(8);
  const [width, setWidth] = useState(8);
  const [mines, setMines] = useState(10);

  // track game data
  const [gameData, setGameData] = useState([]);
  // track game status (win, lose, in-progress )
  const [gameStatus, setGameStatus] = useState("Game in Progress");
  // track remaining mines
  const [mineCount, setMineCount] = useState(mines);
  // used to trigger board reset
  const [key, setKey] = useState(false);

  // map difficulty to board settings (height,width,mines)
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

  // update board settings when difficulty changes
  useEffect(() => {
    const { height, width, mines } = getBoardSettings(difficulty);
    setHeight(height);
    setWidth(width);
    setMines(mines);
    setMineCount(mines);
    setKey(prev => !prev); // trigger board reset
  }, [difficulty]);

  // initialize board on mount and when difficulty changes or reset
  useEffect(() => {
    setGameData(initgameData(height, width, mines));
  }, [height, width, mines, key]);

  // initialize game data (board setup)
  const initgameData = (height, width, mines) => {
    // create empty game board
    let data = createEmptyArray(height, width);
    // place mines
    data = plantMines(data, height, width, mines);
    // count neighboring mines
    data = getNeighborMines(data, height, width);
    return data;
  };

  // reveal board at end of game(win or loss)
  const revealBoard = () => {
    // change all cell values to isRevealed
    let updatedData = gameData.map(row => row.map(item => ({ ...item, isRevealed: true })));
    setGameData(updatedData);
  };

  // reveal adjacent empty cells and non-mine neighboring cells
  const revealEmpty = (y, x, data) => {
    // get grid around the input cell
    let area = traverseBoard(y, x, data, height, width);
    area.forEach(value => {
      // if conditions are met, continue revealing neighbor cells
      if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.y][value.x].isRevealed = true;
        if (value.isEmpty) {
          revealEmpty(value.y, value.x, data);
        }
      }
    });
    return data;
  };

  // handle left click logic
  const handleCellClick = (y, x) => {
    // do nothing ic already clicked or flagged
    if (gameData[y][x].isRevealed || gameData[y][x].isFlagged) return;
    // lose game if mine
    if (gameData[y][x].isMine) {
      setGameStatus("You Lost.");
      revealBoard();
      return;
    }
    //otherwise, reveal cell
    let updatedData = [...gameData];
    updatedData[y][x].isFlagged = false;
    updatedData[y][x].isRevealed = true;
    // if empty, reveal neighboring non-mine cells
    if (updatedData[y][x].isEmpty) {
      updatedData = revealEmpty(y, x, updatedData);
    }
    // if only mines remain unclicked, win game
    if (filterBoard(updatedData, dataitem => !dataitem.isRevealed).length === mines) {
      setMineCount(0);
      setGameStatus("You Win!");
      revealBoard();
      return;
    }
    setGameData(updatedData);
    // update mine-counter
    setMineCount(mines - filterBoard(updatedData, dataitem => dataitem.isFlagged).length);
  };

  // handle right-click logic
  const handleContextMenu = (e, y, x) => {
    // don't show right click menu
    e.preventDefault();
    // do nothing if already revealed
    if (gameData[y][x].isRevealed) return;
    let updatedData = [...gameData];
    let minesLeft = mineCount;

    // unflag if currently flagged
    if (updatedData[y][x].isFlagged) {
      updatedData[y][x].isFlagged = false;
      minesLeft++;
    } else {
      // add flag, but prevent adding more than allowed flags
      if (minesLeft === 0) return;
      updatedData[y][x].isFlagged = true;
      minesLeft--;
    }

    if (minesLeft === 0) {
      const mineArray = filterBoard(updatedData, dataitem => dataitem.isMine);
      const flagArray = filterBoard(updatedData, dataitem => dataitem.isFlagged);
      // check for winning condition:
      // win if flagged cells === cells with mines
      if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
        setGameStatus("You Win!");
        setMineCount(0);
        revealBoard();
        return;
      }
    }
    setGameData(updatedData);
    setMineCount(minesLeft);
  };

  // reset game--toggle key to reset status, minecount, and board
  const resetGame = () => {
    setGameStatus("Game in progress");
    setMineCount(mines);
    setKey(prev => !prev);
  };
  /* 
  - display dropdown menu for selecting difficulty (easy by default)
  - display mine counter and game status
  - render game board
  - render button for restarting game
  */
  return (
    <div className='game'>
      <div className="controls">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy (8×8, 10 mines)</option>
          <option value="medium">Medium (12×12, 20 mines)</option>
          <option value="hard">Hard (16×16, 40 mines)</option>
        </select>
      </div>
      <GameInfo mineCount={mineCount} gameStatus={gameStatus} />
      <Board
        data={gameData}
        handleCellClick={handleCellClick}
        handleContextMenu={handleContextMenu}
      />
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Game;
