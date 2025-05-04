import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getSudokuPuzzles } from "../utilities";
import SudPuzzleCard from "../components/SudPuzzleCard";

export default function SudPage() {
  const [sudData, setSudData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchPuzzles = async () => {
        const data = await getSudokuPuzzles();
        setSudData(data);
      };
    
      fetchPuzzles();
    }, []);


//   const handleClick = (name) => {
//     console.log(name);
//     navigate(`/sudoku/${name}/`);
//   };

  // useEffect(() => {
  //   console.log(sudData);
  // }, [sudData]);


  return (
    <>
      <div className="main-page-contents px-3 py-3">
  <h2 className="mt-1 mb-4">Sudoku Puzzles</h2>
        {sudData ? (
          <div className="row">
            {sudData.map((item, index) => (
              <SudPuzzleCard key={index} id={item.id} puzzleArr={item.puzzle_data.newboard.grids[0]}  />
            ))}
          </div>
        ) : (
          <p>fetching data</p>
        )}
      </div>
    </>
  );
};
