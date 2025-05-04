import React, { useEffect, useState } from "react";
import { api, getSavedPuzzles } from "../utilities";
import SudGrid from "./SudGrid";
import { useParams } from "react-router-dom";


function SudGame() {
    const [puzzle, setPuzzle] = useState(null);
    const [solution, setSolution] = useState(null);
    const { id } = useParams();
    const [savedProgress, setSavedProgress] = useState(null); // if any

    // check for saved progress
    useEffect(() => {
        const checkProgress = async () => {
        const progressList = await getSavedPuzzles();
        const progressForThisPuzzle = progressList?.find(
            p => p.object_id === parseInt(id)
        );
        if (progressForThisPuzzle) {
            setSavedProgress(progressForThisPuzzle.progress);  // e.g., saved grid state
        }}; 
        checkProgress(); 
    }, [id]);

    const test_connection = async () => {
        let response = await api.get(`sudoku/puzzle/${id}/`);
        let data = response.data
        console.log(data);

        try {
            let puzzleArr = data.puzzle_data.newboard.grids[0] // TODO: possibly store difficulty
            setPuzzle(puzzleArr['value']);
            setSolution(puzzleArr['solution']);
            //setLoading(false);
        }
        catch (error) {
            console.error("Error fetching puzzle:", error)
        }
      };
      
      useEffect(() => {
        test_connection();
      }, [id]);

      useEffect(() => {
        if (puzzle !== null) {
            console.log("Updated puzzle:", puzzle);
        }
    }, [puzzle]);

    return (
        <>
        <h3 style={{ textAlign: 'center' }}>{`Puzzle #${id}`}</h3>
        {puzzle !== null && (
            <SudGrid puzzle={puzzle} solution={solution} savedProgress={savedProgress} />
            )}
        </>
    );
}

export default SudGame;