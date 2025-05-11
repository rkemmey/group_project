// Words.jsx
// import wordBank from './wordle-bank.txt'

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
// export const generateWordSet = async () => {
//   let wordSet;
//   let todaysWord;
//   await fetch(wordBank)
//     .then((response) => response.text())
//     .then((result) => {
//       const wordArr = result.split('\n')
//       todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
//       // store words in a set for quick validation check
//       wordSet = new Set(wordArr)
//   })
//   return { wordSet, todaysWord }
// }
export const generateWord = async () => {
  let todaysWord = "";
  try {
    const response = await fetch("http://127.0.0.1:8000/api/minewordle/get_random_word/");

    const data = await response.json();
    todaysWord = data.word;
  } catch (error) {
    console.error("Error fetching word from backend:", error);
  }

  // Just return the word, no wordSet needed now
  return { todaysWord };
};

