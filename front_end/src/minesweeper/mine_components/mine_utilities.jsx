//mine_utilities.jsx
// Utility functions for use on game board

//create the initial array of data for all cells in the grid
export const createEmptyBoard = (height, width) => {
  let data = [];
  // outer loop through the grid rows
  for (let i = 0; i < height; i++) {
    // create a new row
    data.push([]);
    // inner loop through each column in the row
    for (let j = 0; j < width; j++) { 
      //set properties for each cell at point x,y
      data[i][j] = {
        y: i,
        x: j,
        isMine: false,
        neighbor: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      };
    }
  }
  // return initialized grid data
  return data;
};

//get grid of neighbored cells around the current cell
export const adjacentCells = (y, x, data, height, width) => {
  // array to store neighboring cells
  const el = [];
  // looping clockwise around the cell starting with left cell
  if (x > 0) el.push(data[y][x - 1]);
  // diagonal top-left
  if (y < height - 1 && x > 0) el.push(data[y + 1][x - 1]);
  // top
  if (y < height - 1) el.push(data[y + 1][x]);
  // diagonal top-right
  if (y < height - 1 && x < width - 1) el.push(data[y + 1][x + 1]);
  // right
  if (x < width - 1) el.push(data[y][x + 1]);
  // diagonal bottom-right
  if (y > 0 && x < width - 1) el.push(data[y - 1][x + 1]);
  // bottom
  if (y > 0) el.push(data[y - 1][x]);
   // diagonal bottom-left
if (y > 0 && x > 0) el.push(data[y - 1][x - 1]);
  // reutrn array containing the neighboring cells
  return el;
};

//Get random number within grid's height or width
export const getRandomNumber = (measurement) => {
  return Math.floor((Math.random() * 1000) + 1) % measurement;
};

//Plant mines in random cells in the grid
export const plantMines = (data, height, width, mines) => {
  // variables to store random coordinates
  let randomx, randomy, minesPlanted = 0;
  // loop until all mines are planted
  while (minesPlanted < mines) {
      randomx = getRandomNumber(width);
      randomy = getRandomNumber(height);
      // if cell doesn't already contain a mine, plant one
      if (!data[randomy][randomx].isMine) {
      data[randomy][randomx].isMine = true;
      // increment number of mines planted
      minesPlanted++;
      }
  }
  // return updated grid with mines planted
  return data;
};

// get the count of mines in cells bordering the current cell
export const countNeighborMines = (data, height, width) => {
  // copy original grid to avoid mutating input data
  // loop through all rows and columns
  let updatedData = data;
  for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
      // only process cells that aren't mines
      if (!data[i][j].isMine) {
          let mine = 0;
          const area = adjacentCells(data[i][j].y, data[i][j].x, data, height, width);
          // loop through neighboring cells from adjacentCells
          area.forEach(value => {
          // if the cell contains a mine, increment the count
          if (value.isMine) {
              mine++;
          }
          });
          // if no neightoring mines are found, make the cell as empty
          if (mine === 0) {
          updatedData[i][j].isEmpty = true;
          }
          // and set the number of neighboring mines for the cell
          updatedData[i][j].neighbor = mine;
      }
      }
  }
  // return the updated grid with mine counts
  return updatedData;
};

// filter the board based on condition defined by checkType (an identical mine-property)
export const filterCellsByType = (data, checkType) => {
  // initialize array to store cells that meet the condition
  let resultArray = [];
  // loop through each row, followed by each cell
  data.forEach(datarow => {
      datarow.forEach(dataitem => {
      // apply checktype function to determine if cell should be included
      if (checkType(dataitem)) {
          resultArray.push(dataitem);
      }
      });
  });
  // return array of filtered cells
  return resultArray;
};