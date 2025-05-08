// Key.jsx
import { useContext } from 'react'
import { WordleContext } from '../WordleContext';


const Key = ({ keyVal, bigKey} ) => {
  const { onSelectLetter, onDelete, onEnter } = useContext(WordleContext)
  
  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter()
    } else if (keyVal === "DELETE") {
      onDelete()
    } else {
      onSelectLetter(keyVal)
    }
  }
  
  return (
    <div className="key" id={bigKey && "big"} onClick={selectLetter}>
      {keyVal}
    </div>
  )
};

export default Key;