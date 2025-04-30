import React, { useEffect, useState } from 'react';
import "../App.css";
import TwoFourTile from './TwoFourTile';

const SIZE = 4;

const TwoFourGame = () => {
  const [board, setBoard] = useState(createEmptyBoard());

  useEffect(() => {
    let newBoard = addRandomTile(board);
    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        handleMove(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function createEmptyBoard() {
    return Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
  }

  function addRandomTile(b) {
    const empty = [];
    b.forEach((row, i) => row.forEach((cell, j) => {
      if (cell === 0) empty.push([i, j]);
    }));

    if (empty.length === 0) return b;

    const [x, y] = empty[Math.floor(Math.random() * empty.length)];
    const newValue = Math.random() < 0.9 ? 2 : 4;
    const newBoard = b.map(row => [...row]);
    newBoard[x][y] = newValue;
    return newBoard;
  }

  function handleMove(direction) {
    let newBoard = board.map(row => [...row]);

    // Only implement LEFT movement for now (for simplicity)
    if (direction === 'ArrowLeft') {
      newBoard = newBoard.map(row => compressRow(row));
    }

    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
  }

  function compressRow(row) {
    const newRow = row.filter(n => n !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i + 1] = 0;
      }
    }
    return [...newRow.filter(n => n !== 0), ...Array(SIZE - newRow.filter(n => n !== 0).length).fill(0)];
  }

  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((num, j) => (
            <Tile key={j} value={num} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TwoFourGame;
