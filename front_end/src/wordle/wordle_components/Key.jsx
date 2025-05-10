// Key.jsx
import { useContext } from 'react'
import { WordleContext } from '../WordleContext';


const Key = ({ keyVal, bigKey } ) => {
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
  // maintain disabled logic if I want to go back to it
  return (
    <div className="key" 
      // id={bigKey ? "big" : disabled && "disabled"} 
      id={bigKey ? "big" : ""}
      onClick={selectLetter}>
      {keyVal}
    </div>
  )
};

export default Key;