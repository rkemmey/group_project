// const WordleGame = () => {
  
//   return (
//     <div className="p-8 text-center">
//       <h2 className="text-4xl font-bold">WordleGame</h2>
//     </div>
//   );
// };

// export default WordleGame;
// WordleGame.jsx
import './wordle.css'
import React from 'react';
import Board from './wordle_components/Board';
import KeyBoard from './wordle_components/KeyBoard';
import { boardDefault } from './Words';
import { useState } from 'react';
import { WordleContext } from './WordleContext';

const WordleGame = () => {
  const [board, setBoard] = useState(boardDefault)
  return (
      <div className="wordleGame">
        <WordleContext.Provider value={{board, setBoard}}>
          <Board />
          <KeyBoard />
        </WordleContext.Provider>
      </div>
  );
};

export default WordleGame;




