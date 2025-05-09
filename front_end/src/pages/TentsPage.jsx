// src/pages/TentsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TentsGrid from '../components/TentsGrid';

const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000/api/tents'
  : '/api/tents';

const TentsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [puzzle, setPuzzle] = useState(null);
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [solution, setSolution] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [allPuzzles, setAllPuzzles] = useState([]);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/puzzle/${id}/`);
        if (!res.data?.board_data) throw new Error("Invalid puzzle data");
        setPuzzle(res.data);
        const saved = localStorage.getItem(`tents-${id}`);
        setUserProgress(saved ? JSON.parse(saved) : {});
        setStartTime(Date.now());

        const solutionRes = await axios.get(`${API_BASE_URL}/solution/${id}/`);
        setSolution(solutionRes.data.solution);
      } catch (err) {
        console.error('Failed to load puzzle:', err);
        setError("Puzzle not found.");
      }
    };
    fetchPuzzle();
  }, [id]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/allpuzzles/`)
      .then(res => Array.isArray(res.data) && setAllPuzzles(res.data))
      .catch(err => console.error("Failed to fetch puzzles:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime && !paused) {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, paused]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const updateProgress = (key, value) => {
    const updated = { ...userProgress, [key]: value };
    setUserProgress(updated);
    localStorage.setItem(`tents-${id}`, JSON.stringify(updated));
  };

  const handleButtonAction = (action) => {
    const saved = localStorage.getItem(`tents-${id}`);
    switch (action) {
      case 'save':
        localStorage.setItem(`tents-${id}`, JSON.stringify(userProgress));
        alert("✅ Progress saved.");
        break;
      case 'load':
        if (saved) {
          setUserProgress(JSON.parse(saved));
          alert("✅ Progress loaded.");
        } else {
          alert("⚠️ No saved progress.");
        }
        break;
      case 'restart':
        if (window.confirm("Restart this puzzle?")) {
          setUserProgress({});
          localStorage.removeItem(`tents-${id}`);
          setStartTime(Date.now());
        }
        break;
      case 'pause':
        setPaused(prev => !prev);
        break;
      default:
        break;
    }
  };

  const handleCheck = () => {
    if (!solution) return;
  
    let correct = true;
    for (let i = 0; i < solution.length; i++) {
      for (let j = 0; j < solution[i].length; j++) {
        const isTent = solution[i][j] === 'tent';
        const userMarked = userProgress[`${i}-${j}`] === 'tent';
        if (isTent !== userMarked) {
          correct = false;
          break;
        }
      }
      if (!correct) break;
    }
  
    alert(correct ? "✅ Correct solution!" : "❌ There are mistakes.");
  };

  const handleViewSolution = () => {
    const filled = {};
    solution.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) filled[`${i}-${j}`] = cell;
      });
    });
    setUserProgress(filled);
    alert("👀 Solution loaded.");
  };

  const deletePuzzleAndRedirect = async () => {
    if (window.confirm("Delete this puzzle permanently?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}/delete/`);
        alert("🗑️ Puzzle deleted.");
        const remaining = allPuzzles.filter(p => p.id !== parseInt(id));
        setAllPuzzles(remaining);
        navigate(remaining.length ? `/tents/${remaining[0].id}` : '/tents/new');
      } catch (err) {
        console.error("Failed to delete puzzle:", err);
        alert("❌ Could not delete puzzle.");
      }
    }
  };

  if (error) {
    return (
      <div className="text-danger text-center mt-5">
        <h5>{error}</h5>
        <button className="btn btn-warning mt-3" onClick={() => navigate('/tents/new')}>
          Try Another Puzzle
        </button>
      </div>
    );
  }

  if (!puzzle || !Array.isArray(puzzle.board_data)) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading Tents puzzle...</p>
      </div>
    );
  }

  const difficultyColor = {
    easy: 'text-success',
    medium: 'text-warning',
    hard: 'text-danger',
  }[puzzle.difficulty] || 'text-primary';

  return (
    <div className="container text-center">
      <h2 className={`fw-bold my-4 ${difficultyColor}`}>
        🌳 {puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)} Tents Puzzle
      </h2>

      <p className="text-muted mb-1">
        Difficulty: <strong>{puzzle.difficulty}</strong> |
        Created: <strong>{new Date(puzzle.created_at).toLocaleString()}</strong>
      </p>

      <p className="text-info mb-3">
        ⏱️ Time Elapsed: <strong>{formatTime(elapsed)}</strong>
      </p>

      <TentsGrid
        boardData={puzzle.board_data}
        rowClues={puzzle.row_clues}
        colClues={puzzle.col_clues}
        userProgress={userProgress}
        onCellChange={updateProgress}
        solution={solution}
      />

      <div className="mt-4 d-flex justify-content-center gap-2 flex-wrap">
        <button className="btn btn-success" onClick={() => handleButtonAction('save')}>Save</button>
        <button className="btn btn-primary" onClick={() => handleButtonAction('load')}>Load</button>
        <button className="btn btn-warning" onClick={() => handleButtonAction('restart')}>Restart</button>
        <button className="btn btn-secondary" onClick={() => handleButtonAction('pause')}>
          {paused ? '▶️ Resume' : '⏸️ Pause'}
        </button>
        <button className="btn btn-info" onClick={handleCheck}>Check</button>
        <button className="btn btn-outline-dark" onClick={handleViewSolution}>View Solution</button>
        <button className="btn btn-danger" onClick={deletePuzzleAndRedirect}>Delete</button>
      </div>
    </div>
  );
};

export default TentsPage;
