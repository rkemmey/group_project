/*
- stateless cell component represents single cell with custom variables and props.
- value = properties of cell
- function determines the value of the cell based on its state
*/
const Cell = ({ value, leftClick, rightClick }) => { 
  const getValue = () => {
    // if cell not revealed, show either a flag or nothing
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null;
    }
    // if the cell is mine, return bomb emoji
    if (value.isMine) {
      return "💣";
    }
    // if cell has no neighboring mines, return nothing
    if (value.neighbor === 0) 
      return null;
    // else, return number of neighboring mines
    return value.neighbor;
  };

  //group class names together for styling
  let className = "cell" +
  (value.isRevealed ? "" : " hidden") +
  (value.isMine ? " is-mine" : "") +
  (value.isFlagged ? " is-flag" : "") +
  (() => {
    // add additional styles basd on number of neighboring mines
    switch(value.neighbor) {
      case 1: return " blue";
      case 2: return " green";
      case 3: return " red";
      case 4: return " blue";
      default: return " purple";
    }
  })();

  // return cell as a div with both event handlers and className
  return ( 
    <div onClick={leftClick} className={className} onContextMenu={rightClick}>
      {getValue()}
    </div>
  );
};

export default Cell;