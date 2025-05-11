// src/components/DifficultySelector.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DifficultySelector = ({ puzzleType = "kakuro" }) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.MODE === 'development'
    ? `http://127.0.0.1:8000/api/${puzzleType}`
    : `/api/${puzzleType}`;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/generate/`, { difficulty });
      if (res.data?.id) {
        navigate(`/${puzzleType}/${res.data.id}`);
      } else {
        alert("Puzzle generated but no ID returned.");
      }
    } catch (err) {
      alert("❌ Failed to generate puzzle.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Select Difficulty</h2>
      <div className="btn-group my-3">
        {['easy', 'medium', 'hard'].map(level => (
          <button
            key={level}
            className={`btn btn-${difficulty === level ? 'primary' : 'outline-primary'}`}
            onClick={() => setDifficulty(level)}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
      <div>
        <button className="btn btn-success" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "🧩 Generate Puzzle"}
        </button>
      </div>
    </div>
  );
};

export default DifficultySelector;
