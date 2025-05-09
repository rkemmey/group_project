//GameOver.jsx
import { useContext} from 'react'
import { WordleContext } from '../WordleContext';

const GameOver = () => {
  const { gameOver, currAttempt, correctWord } = useContext(WordleContext)

  // display different messages based on correct or incorrect guesses
  // also show number of attempts if the game is won
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "You Correctly Guessed" : "You failed"}</h3>
      <h1>Correct: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>)}
    </div>
  );
};

export default GameOver;