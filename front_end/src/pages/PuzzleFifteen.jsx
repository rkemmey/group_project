import React, { useState, useEffect } from 'react';

const PuzzleFifteen = () => {
    const [tiles, setTiles] = useState([]);
    const [moves, setMoves] = useState(0);
    const [won, setWon] = useState(false);

    useEffect(() => {
    resetGame();
    }, []);

    const resetGame = () => {
    const newBoard = generateSolvableBoard();
    setTiles(newBoard);
    setMoves(0);
    setWon(false);
    };

    const generateSolvableBoard = () => {
    let arr;
    do {
        arr = shuffle([...Array(15).keys()].map(n => n + 1).concat(null));
        console.log("New board:", arr, "Solvable?", isSolvable(arr));
    } while (!isSolvable(arr));
    return arr;
    };

    const shuffle = (array) => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
    };

    const isSolvable = (board) => {
    const inversionCount = board
        .filter(x => x !== null)
        .map((val, i) => board.slice(i + 1).filter(n => n !== null && n < val).length)
        .reduce((a, b) => a + b, 0);
    const blankRowFromBottom = 4 - Math.floor(board.indexOf(null) / 4);
    return (inversionCount + blankRowFromBottom) % 2 === 1;
    };

    const checkWin = (board) => {
    for (let i = 0; i < 15; i++) {
        if (board[i] !== i + 1) return false;
    }
    return board[15] === null;
    };

    const moveTile = (index) => {
    if (won) return;

    const emptyIndex = tiles.indexOf(null);
    const validMoves = [index - 1, index + 1, index - 4, index + 4];

    // prevent wrap around between rows
    if (index % 4 === 0) {
        const i = validMoves.indexOf(index - 1);
        if (i !== -1) validMoves.splice(i, 1);
      }
      if (index % 4 === 3) {
        const i = validMoves.indexOf(index + 1);
        if (i !== -1) validMoves.splice(i, 1);
      }

    if (validMoves.includes(emptyIndex)) {
        const newTiles = [...tiles];
        [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
        setTiles(newTiles);
        setMoves(prev => prev + 1);
        if (checkWin(newTiles)) setWon(true);
    }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
        <h2>15 Puzzle</h2>
        <p>Moves: {moves}</p>
        {won && <p style={{ color: 'green', fontSize: '100px', fontWeight: 'bold' }}>Congrats! You won!</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: '5px', marginBottom: '10px' }}>
        {tiles.map((tile, i) => (
            <button
            key={i}
            onClick={() => moveTile(i)}
            style={{
                width: '60px',
                height: '60px',
                fontSize: '20px',
                backgroundColor: tile === null ? '#eee' : '#ccc',
                border: '1px solid #999',
                cursor: tile !== null ? 'pointer' : 'default',
            }}
            >
            {tile}
            </button>
        ))}
        </div>
        <button onClick={resetGame} className="check-button">Reset</button>
    </div>
    );
};
    
export default PuzzleFifteen;
