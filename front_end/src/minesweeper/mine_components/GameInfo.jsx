//GameInfo.jsx
// gameinfo component displays games status, mine count, and final score
const GameInfo = ({ score, gameStatus, mineCount }) => {
  return (
    <div className="game-info">
      <div className="status">
        <strong>Status:</strong> {gameStatus}
      </div>
      <div className="mines">
        <strong>Mines:</strong> {mineCount}
      </div>
      <div className="score">
        <strong>Final Score:</strong> {score}
      </div>
    </div>
  );
};

export default GameInfo;
