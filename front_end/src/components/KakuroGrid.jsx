// KakuroGrid.jsx
import React from 'react';
import './KakuroGrid.css';

const KakuroGrid = ({ boardData, userProgress = {}, onCellChange, solution }) => {
  // Debug logs
  console.log("✅ KakuroGrid received boardData:", boardData);
  console.log("✅ KakuroGrid received userProgress:", userProgress);
  console.log("✅ KakuroGrid received solution:", solution);

  if (!Array.isArray(boardData)) {
    return <p className="text-danger text-center">⚠️ Invalid or missing puzzle data.</p>;
  }

  return (
    <div className="kakuro-grid mx-auto">
      {boardData.map((row, rowIndex) => (
        <div key={rowIndex} className="kakuro-row">
          {row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;

            if (cell.type === 'block') {
              return (
                <div key={key} className="kakuro-cell block-cell">
                  {cell.clue && (
                    <>
                      {cell.clue.down && <div className="clue-down">{cell.clue.down}</div>}
                      {cell.clue.across && <div className="clue-across">{cell.clue.across}</div>}
                    </>
                  )}
                </div>
              );
            } else if (cell.type === 'input') {
              const userValue = userProgress?.[key];
              const correctValue = solution?.[rowIndex]?.[colIndex];
              const isIncorrect = userValue && correctValue && userValue !== String(correctValue);

              return (
                <div key={key} className="kakuro-cell input-cell">
                  <input
                    className={isIncorrect ? 'input-error' : ''}
                    type="text"
                    inputMode="numeric"
                    pattern="[1-9]*"
                    maxLength={1}
                    value={userValue ?? ''}
                    onChange={(e) => onCellChange(key, e.target.value)}
                  />
                </div>
              );
            }

            return <div key={key} className="kakuro-cell invalid-cell">!</div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default KakuroGrid;





