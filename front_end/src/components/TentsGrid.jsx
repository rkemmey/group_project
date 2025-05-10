// src/components/TentsGrid.jsx
import React from 'react';
import './TentsGrid.css';

const TentsGrid = ({
  boardData,
  rowClues = [],
  colClues = [],
  userProgress = {},
  onCellChange,
  solution
}) => {
  if (!Array.isArray(boardData) || boardData.length === 0) {
    return <p className="text-danger text-center">⚠️ Invalid or missing puzzle data.</p>;
  }

  const handleCellClick = (row, col) => {
    const key = `${row}-${col}`;
    if (boardData[row][col] === 'tree') return; // Do nothing for trees

    const current = userProgress[key];
    const next = current === 'tent' ? null : 'tent'; // Toggle tent
    onCellChange(key, next);
  };

  const renderCell = (row, col) => {
    const key = `${row}-${col}`;
    const cell = boardData[row][col];
    const userValue = userProgress[key];
    const correctValue = solution?.[row]?.[col];

    let cellClass = 'tents-cell';
    let content = '';

    if (cell === 'tree') {
      cellClass += ' tree-cell';
      content = '🌳';
    } else if (userValue === 'tent') {
      cellClass += ' tent-cell';
      content = '⛺';
      if (correctValue && userValue !== correctValue) {
        cellClass += ' input-error';
      }
    }

    return (
      <div key={key} className={cellClass} onClick={() => handleCellClick(row, col)}>
        {content}
      </div>
    );
  };

  return (
    <div className="tents-grid-wrapper">
      <div className="tents-grid">
        {/* Top row with column clues */}
        <div className="tents-row clue-row">
          <div className="clue-cell corner-cell"></div>
          {colClues.map((clue, idx) => (
            <div key={`col-${idx}`} className="clue-cell col-clue">{clue}</div>
          ))}
        </div>

        {/* Puzzle rows with left-side row clues */}
        {boardData.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="tents-row">
            <div className="clue-cell row-clue">{rowClues[rowIndex]}</div>
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TentsGrid;



