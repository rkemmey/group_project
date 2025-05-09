// Key.jsx
import { useContext } from 'react'
import { WordleContext } from '../WordleContext';


const Key = ({ keyVal, bigKey, disabled } ) => {
  const { onSelectLetter, onDelete, onEnter } = useContext(WordleContext)
  
  // handle key selection
  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter()
    } else if (keyVal === "DELETE") {
      onDelete()
    } else {
      onSelectLetter(keyVal)
    }
  }
  
  // set css class big or disabled as appropriate, display key value
  return (
    <div className="key" 
      id={bigKey ? "big" : disabled && "disabled"} 
      onClick={selectLetter}>
      {keyVal}
    </div>
  )
};

export default Key;