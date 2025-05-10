//GameOver.jsx
import { useContext} from 'react'
import { WordleContext } from '../WordleContext';

const GameOver = () => {
  const { gameOver, currAttempt, correctWord } = useContext(WordleContext)

  // display different messages based on correct or incorrect guesses
  // also show number of attempts if the game is won
  return (
    <div className="gameOver">
      <h1>Correct: {correctWord}</h1>
      <h5>{gameOver.guessedWord ? "You Correctly Guessed!" : "You failed!"}</h5>
      {gameOver.guessedWord && (
        <h5>You guessed in {currAttempt.attempt} attempts!</h5>)}
    </div>
  );
};

export default GameOver;