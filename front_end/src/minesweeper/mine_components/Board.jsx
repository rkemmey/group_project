import Cell from './Cell';
/*
- board component renders a grid of cells
- outer-loop iterates through each row in the board data
- inner-loop iterates through each cell
- set board length dynamically based on difficulty selected
*/
const Board = ({ data, handleCellClick, handleContextMenu }) => {
  const width = data[0]?.length || 0;

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${width}, 45px)` }}
    >
      {data.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${y}-${x}`}
            value={cell}
            onClick={() => handleCellClick(y, x)}
            cMenu={(e) => handleContextMenu(e, y, x)}
          />
        ))
      )}
    </div>
  );
};


export default Board;
