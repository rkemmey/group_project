//GameInfo.jsx
// gameinfo component displays games status and remaining mine count
const GameInfo = ({ mineCount, gameStatus}) => {
  const getStatusClass = () => { 
    // determines styling class to apply based on gameStatus
    if (gameStatus === "You Win!") return "win";
    if (gameStatus === "You Lost.") return "lose";
    return "";
  };
  // renders game info container appropriate status class
  return (
    <div className={`game-info ${getStatusClass()}`}>
      <span className="info">Mines remaining: {mineCount}</span>
      <h1 className="info">{gameStatus}</h1>
    </div>
  );
};

export default GameInfo;