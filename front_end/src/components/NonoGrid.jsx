import React, { useState, useEffect } from "react";
import "../App.css";
import { savePuzzleProgress } from "../utilities";
import { useParams } from "react-router-dom";

const NonoGrid = ({ rowhint, colhint, solution, savedProgress}) => {
    const [grid, setGrid] = useState([]);
    const [message, setMessage] = useState("");
    const [showingSolution, setShowingSolution] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [paintMode, setPaintMode] = useState(null);
    const { id } = useParams();
    const maxColHintDepth = Math.max(...colhint.map(h => h.length));
    const topMargin = maxColHintDepth > 3 ? '5rem' : '2rem';


    useEffect(() => {
      if (savedProgress) {
        setGrid(savedProgress);
      } else if (solution.length > 0) {
        const initialGrid = Array(solution.length).fill().map(() => Array(solution.length).fill(0));
        setGrid(initialGrid);
      }
    }, [savedProgress, solution.length]); 

    // Toggle cell state (0 = empty, 1 = filled, 2 = marked as X)
    const toggleCell = (row, col) => {
      if (showingSolution) return;
        setGrid((prevGrid) => {
        const newGrid = prevGrid.map((r) => [...r]); // Deep copy the grid
        newGrid[row][col] = (newGrid[row][col] + 1) % 3; // Cycle between 0 → 1 → 2
        return newGrid;
        });
    };

    // Apply paint mode (drag fill/mark)
    const applyPaint = (row, col) => {
      if (showingSolution || paintMode === null) return;
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((r) => [...r]);
        newGrid[row][col] =
          paintMode === "fill" ? 1 : paintMode === "mark" ? 2 : 0;
        return newGrid;
      });
    };

    const handleMouseDown = (row, col) => {
      if (showingSolution) return;
      setIsMouseDown(true);
      // Set paint mode based on the clicked cell
      const cell = grid[row][col];
      const newMode = cell === 0 ? "fill" : cell === 1 ? "mark" : "clear";
      setPaintMode(newMode);
      applyPaint(row, col);
    };

    const handleMouseEnter = (row, col) => {
      if (isMouseDown) applyPaint(row, col);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      setPaintMode(null);
    };

    useEffect(() => {
      const handleMouseUp = () => setIsMouseDown(false);
      window.addEventListener("mouseup", handleMouseUp);
      return () => window.removeEventListener("mouseup", handleMouseUp);
    }, []);


    // Check the current grid against the solution
    const checkSolution = () => {
      const isCorrect = grid.every((row, rowIndex) =>
        row.every((cell, colIndex) => {
          const solutionCell = solution[rowIndex][colIndex];
          return (
            (solutionCell === 1 && cell === 1) ||
            (solutionCell === 0 && cell !== 1) // allow X or empty for empty cells
          );
        })
      );
      setMessage(isCorrect ? "Correct!" : "Incorrect. Try again.");
    };

    // Show solution
    const showSolution = () => {
      const revealedGrid = solution.map((row) =>
        row.map((cell) => (cell === 1 ? 1 : 0)) // Fill only the filled parts
      );
      setGrid(revealedGrid);
      setShowingSolution(true);
      setMessage("Here's the solution.");
    };

    const handleSaveProgress = async () => {
      const result = await savePuzzleProgress({
        contentTypeId: 2, //manually set nono ID as 2
        objectId: id, //puzzleID
        progress: grid,
        isCompleted: false,
      });
    
      if (result) {
        alert('Progress saved!');
      } else {
        alert('Failed to save progress.');
      }
    };

    return (
      <>
        <div className="grid-wrapper"
          style={{
            marginTop: topMargin,
            display: "grid",
            gridTemplateColumns: `repeat(${solution.length + 1}, 30px)`,
            gridTemplateRows: `repeat(${solution.length + 1}, 30px)`,
          }}>
        
          <div className="hint-cell" />
          {/* Column hints */}
          {colhint.map((col, colIndex) => (
            <div key={`colhint-${colIndex}`} className="hint-cell vertical">
              {col.map((num, i) => (
                <div key={i}>{num}</div>
              ))}
            </div>
          ))}
    
          {/* Row hints + actual grid */}
          {grid.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {/* Row hint */}
              <div key={`rowhint-${rowIndex}`} className="hint-cell">
                {rowhint[rowIndex].join(" ")}
              </div>
    
              {/* Grid row */}
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  // onClick={() => toggleCell(rowIndex, colIndex)}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  className={`cell ${cell === 1 ? "filled" : ""} ${
                    cell === 2 ? "marked" : ""
                  }`}
                >
                  {cell === 2 ? "X" : ""}
                </div>
              
              ))}
            </React.Fragment>
          ))}
          </div>
           

          <div className="button-container">
            <button className="check-button" onClick={checkSolution}>Check Solution</button>
            <button className="check-button" onClick={handleSaveProgress}>Save Progress</button>
            <button className="check-button" onClick={showSolution}>Show Solution</button>
            </div>
            {message && <div className="message">{message}</div>}

            </>
      );
};

export default NonoGrid;