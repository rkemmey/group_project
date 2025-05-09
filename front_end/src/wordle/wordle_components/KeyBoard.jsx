// KeyBoard.jsx
import Key from './Key';
import { useCallback, useEffect, useContext, useMemo } from 'react';
import { WordleContext } from '../WordleContext';

const KeyBoard = () => {
  const { onSelectLetter, onDelete, onEnter, disabledLetters } = useContext(WordleContext);

  // define keyboard rows
  const keys1 = useMemo(() => ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], []);
  const keys2 = useMemo(() => ["A", "S", "D", "F", "G", "H", "J", "K", "L"], []);
  const keys3 = useMemo(() => ["Z", "X", "C", "V", "B", "N", "M"], []);

  // combine key rows into single array, converting to lowercase for easier checking
  const allKeys = useMemo(() => {
    return [...keys1, ...keys2, ...keys3].map(k => k.toLowerCase());
  }, [keys1, keys2, keys3]);

  // handle keyboard input from user
  const handleKeyBoard = useCallback((event) => {
    // convery pressed key to lowercase
    const key = event.key.toLowerCase();

    // call appropriate functionality based on what's pressed
    if (key === "enter") {
      onEnter();
    } else if (key === "backspace") {
      onDelete();
    } else if (allKeys.includes(key)) {
      onSelectLetter(event.key.toUpperCase());
    }
  }, [onEnter, onDelete, onSelectLetter, allKeys]);

  // add event listner for keydown when component mounts
  useEffect(() => {
    document.addEventListener("keydown", handleKeyBoard);
    return () => {
      // remove event listener when it unmounts
      document.removeEventListener("keydown", handleKeyBoard);
    };
  }, [handleKeyBoard]);

  // renders each row of keyboard, including enter and delete buttons
  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)}/>
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)}/>
        ))}
      </div>
      <div className="line3">
        <Key keyVal="ENTER" bigKey />
        {keys3.map((key) => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)}/>
        ))}
        <Key keyVal="DELETE" bigKey />
      </div>
    </div>
  );
};

export default KeyBoard;
