// const AboutWordle = () => {
  
//   return (
//     <div className="p-8 text-center">
//       <h2 className="text-4xl font-bold">AboutWordle</h2>
//     </div>
//   );
// };

// export default AboutWordle;
// AboutWordle.jsx
import React from 'react';

function AboutWordle() {
    return (
        <div className="main-page-contents px-3 py-3">
          <h1 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>
            About Wordle
          </h1>
    
          {/* Introduction */}
          <div className="rounded p-3 mb-2">
            <p>
             Wordle is a popular word-guessing game that challenges players to identify a hidden five-letter word within six attempts. It's a game of logic, vocabulary, and pattern recognition, offering feedback after each guess to help you narrow down the possibilities.
            </p>
          </div>
    
          {/* How to Play */}
          <div className="bg-light rounded p-4 mb-3">
            <h3>How to Play</h3>
            <p>
             Each round begins with a blank grid and six chances to guess the hidden five-letter word. In this version, you can play using your physical keyboard or by clicking on the on-screen keys to enter letters, delete them, and submit your guesses. You win if you guess the correct word within six tries. After each guess, the game provides color-coded feedback on each letter. Or you can reset the game for a new word!
            </p>
            <ul>
              <li>If it's green, the letter is in the correct position.</li>
              <li>If it's yellow, the letter is in word, but in the wrong position.</li>
              <li>If it's grey, the letter is not in the word at all.</li>
            </ul>
          </div>
    
          {/* Strategies */}
          <div className="bg-light rounded p-4 mb-3">
            <h3>Wordle Strategies</h3>
            <p>The challenge lies in interpreting the feedback to make progressively smarter guesses.</p>
            <ul>
              <li>Eliminate vowels and common consonants.</li>
              <li>Think about letter placement and consider common word patterns.</li>
            </ul>
          </div>
        </div>
      );
};
export default AboutWordle;