//Letter.jsx
import { useContext } from 'react'
import { WordleContext } from '../WordleContext';

const Letter = ({ letterPos, attemptVal }) => {
  const { board } = useContext(WordleContext)
  const letter = board[attemptVal][letterPos]
  return (
    <div className="letter">{letter}</div>
  );
};

export default Letter;