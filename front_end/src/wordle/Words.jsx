// Words.jsx
import wordBank from './wordle-bank.txt'

// set default structure of wordle game
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// generates set of valid words and randomly selects word from list
export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split('\n')
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
      // store words in a set for quick validation check
      wordSet = new Set(wordArr)
  })
  return { wordSet, todaysWord }
}