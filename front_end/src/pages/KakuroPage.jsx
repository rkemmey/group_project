// src/pages/KakuroPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import KakuroGrid from '../components/KakuroGrid';
import '../components/KakuroGrid.css';

const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000/api/kakuro'
  : '/api/kakuro';

const KakuroPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [puzzle, setPuzzle] = useState(null);
  const [error, setError] = useState(null);
  const [allPuzzles, setAllPuzzles] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [difficulty, setDifficulty] = useState("easy");
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [solution, setSolution] = useState(null);
  const [paused, setPaused] = useState(false); // ✅ New state for pause

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/puzzle/${id}/`);
        if (!res.data?.board_data) throw new Error("Invalid data");
        setPuzzle(res.data);

        const saved = localStorage.getItem(`kakuro-${id}`);
        setUserProgress(saved ? JSON.parse(saved) : {});
        setStartTime(Date.now());

        const solutionRes = await axios.get(`${API_BASE_URL}/solution/${id}/`);
        setSolution(solutionRes.data.solution);
      } catch (err) {
        setError("Puzzle not found.");
      }
    };
    fetchPuzzle();
  }, [id]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/allpuzzles/`)
      .then(res => Array.isArray(res.data) && setAllPuzzles(res.data))
      .catch(err => console.error("Failed to load puzzles:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime && !paused) {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, paused]); // ✅ Updated

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const updateProgress = (key, value) => {
    const updated = { ...userProgress, [key]: value };
    setUserProgress(updated);
    localStorage.setItem(`kakuro-${id}`, JSON.stringify(updated));
  };

  const handleButtonAction = (action) => {
    const saved = localStorage.getItem(`kakuro-${id}`);
    switch (action) {
      case 'save':
        localStorage.setItem(`kakuro-${id}`, JSON.stringify(userProgress));
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
      case 'delete':
        if (window.confirm("Delete saved progress?")) {
          localStorage.removeItem(`kakuro-${id}`);
          setUserProgress({});
          alert("🗑️ Progress deleted.");
        }
        break;
      case 'restart':
        if (window.confirm("Restart puzzle from scratch?")) {
          setUserProgress({});
          localStorage.removeItem(`kakuro-${id}`);
          setStartTime(Date.now());
          alert("🔄 Puzzle restarted.");
        }
        break;
      case 'pause':
        setPaused(prev => !prev);
        break;
      default:
        break;
    }
  };

  const handleCheck = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/solution/${id}/`);
      const solution = data.solution;
      let correct = true;

      solution.forEach((row, i) =>
        row.forEach((cell, j) => {
          const key = `${i}-${j}`;
          if (typeof cell === 'number' && parseInt(userProgress[key], 10) !== cell) {
            correct = false;
          }
        })
      );

      alert(correct ? "✅ Correct solution!" : "❌ Incorrect entries found.");
    } catch (err) {
      console.error("Solution check failed:", err);
    }
  };

  const handleViewSolution = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/solution/${id}/`);
      const filled = {};
      data.solution.forEach((row, i) =>
        row.forEach((cell, j) => {
          if (typeof cell === 'number') filled[`${i}-${j}`] = cell.toString();
        })
      );
      setUserProgress(filled);
      alert("👀 Solution loaded.");
    } catch (err) {
      console.error("Failed to load solution:", err);
    }
  };

  const generateNewPuzzle = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/generate/`, { difficulty });
      if (data?.id) {
        navigate(`/kakuro/${data.id}`);
      } else {
        alert("Generated puzzle but no ID returned.");
      }
    } catch (err) {
      console.error("Puzzle generation failed:", err);
      alert("❌ Failed to generate puzzle.");
    }
  };

  const deletePuzzleAndRedirect = async () => {
    if (window.confirm("⚠️ Delete this puzzle from the database?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}/delete/`);
        alert("🗑️ Puzzle deleted from server.");
        const remaining = allPuzzles.filter(p => p.id !== parseInt(id));
        setAllPuzzles(remaining);
        navigate(remaining.length ? `/kakuro/${remaining[0].id}` : '/kakuro/new');
      } catch (err) {
        console.error("Delete failed:", err);
        alert("❌ Failed to delete puzzle.");
      }
    }
  };

  if (error) {
    return (
      <div className="text-danger text-center mt-5">
        <h5>{error}</h5>
        <button
          className="btn btn-warning mt-3"
          onClick={() => {
            const fallback = allPuzzles.find(p => p.id !== parseInt(id));
            navigate(fallback ? `/kakuro/${fallback.id}` : '/kakuro/new');
          }}
        >
          Try Another Puzzle
        </button>
      </div>
    );
  }

  if (!puzzle || !Array.isArray(puzzle.board_data)) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading Kakuro puzzle...</p>
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
        <i className="bi bi-grid-3x3-gap-fill me-2"></i>
        {puzzle.difficulty
          ? `${puzzle.difficulty.charAt(0).toUpperCase()}${puzzle.difficulty.slice(1)} Kakuro Puzzle`
          : 'Kakuro Puzzle'}
      </h2>

      <p className="text-muted mb-1">
        Difficulty: <strong>{puzzle.difficulty || 'N/A'}</strong> |
        Created: <strong>{new Date(puzzle.created_at).toLocaleString()}</strong>
      </p>

      <p className="text-info mb-3">
        🕒 Time Elapsed: <strong>{formatTime(elapsed)}</strong>
      </p>

      <KakuroGrid
        boardData={puzzle.board_data}
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
        <button className="btn btn-danger" onClick={() => handleButtonAction('delete')}>Delete Progress</button>
        <button className="btn btn-outline-info" onClick={handleCheck}>Check Solution</button>
        <button className="btn btn-outline-secondary" onClick={handleViewSolution}>View Solution</button>
      </div>

      <hr className="my-4" />

      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <select
          className="form-select w-auto"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">🟢 Easy</option>
          <option value="medium">🟠 Medium</option>
          <option value="hard">🔴 Hard</option>
        </select>
        <button className="btn btn-outline-primary" onClick={generateNewPuzzle}>
          Generate New Puzzle
        </button>
        <button className="btn btn-outline-danger" onClick={deletePuzzleAndRedirect}>
          Delete Puzzle
        </button>
      </div>
    </div>
  );
};

export default KakuroPage;

