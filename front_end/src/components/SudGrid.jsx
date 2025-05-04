import React, { useState, useEffect} from "react";
import "../App.css";
import { savePuzzleProgress } from "../utilities";
import { useParams } from "react-router-dom";

const SudGrid = ({ puzzle, solution, savedProgress }) => {
    const [board, setBoard] = useState([]);
    const [message, setMessage] = useState(""); // Validation message
    const [showingSolution, setShowingSolution] = useState(false);
    const { id } = useParams();

    // set board
    useEffect(() => {
        if (savedProgress) {
        setBoard(savedProgress);
        } else if (puzzle) {
        setBoard(puzzle); 
        }
    }, [savedProgress, puzzle]);

    const handleChange = (row, col, value) => {
        const updatedBoard = board.map((r, rowIndex) => // loop through each row -- map(element, index, array)
            r.map((cell, colIndex) => { // loop through each column
                if (rowIndex === row && colIndex === col) { // if this was the cell that was changed (indices match)
                    const num = parseInt(value, 10); // string to num
                    return isNaN(num) ? 0 : Math.min(9, Math.max(1, num));
                }
                return cell;
            })
        );
        setBoard(updatedBoard);
    };

    const checkSolution = () => {
        const isCorrect = board.every((row, rowIndex) =>
            row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
        );
        setMessage(isCorrect ? "Correct!" : "Incorrect. Try again.");
    };

    const showSolution = () => {
        setBoard(solution);
        setShowingSolution(true);
        setMessage("Here's the solution.");
    };

    const handleSaveProgress = async () => {
          const result = await savePuzzleProgress({
            contentTypeId: 1, //manually set sud ID as 1
            objectId: id, //puzzleID
            progress: board, //current state
            isCompleted: false,
          });
        
          if (result) {
            alert('Progress saved!');
          } else {
            alert('Failed to save progress.');
          }
        };
    

    return (
        <div className="sudoku-container">
            <div className="sudoku-grid">
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const isEditable = !showingSolution && puzzle[rowIndex][colIndex] === 0;
                    return (
                        <input
                            key={`${rowIndex}-${colIndex}`} //unique key for each cell
                            value={cell === 0 ? "" : cell}
                            onChange={event =>
                                isEditable &&
                                handleChange(rowIndex, colIndex, event.target.value)
                            }
                            readOnly={!isEditable}
                            className={`sudoku-cell ${
                                isEditable ? "editable" : "clue"
                            }`}
                        />
                    );
                })
            )}
            </div>
            <div className="button-container">
                <button className="check-button" onClick={checkSolution}>Check Solution</button>
                <button className="check-button" onClick={handleSaveProgress}>Save Progress</button>
                <button className="check-button" onClick={showSolution}>Show Solution</button>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default SudGrid;
