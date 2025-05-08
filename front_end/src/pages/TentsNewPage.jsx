// src/pages/TentsNewPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Spinner, Container, Form } from 'react-bootstrap';

const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000/api/tents'
  : '/api/tents';

const TentsNewPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  const handleGeneratePuzzle = () => {
    setLoading(true);
    axios.post(`${API_BASE_URL}/generate/`, { difficulty })
      .then(res => {
        if (res.data?.id) {
          navigate(`/tents/${res.data.id}`);
        } else {
          alert('Puzzle generated but no ID returned.');
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('❌ Failed to generate puzzle:', err);
        alert('❌ Could not generate a new puzzle.');
        setLoading(false);
      });
  };

  return (
    <Container className="text-center mt-5">
      <h3>Create a New Tents Puzzle</h3>
      <Form.Select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="my-3 w-auto mx-auto"
      >
        <option value="easy">🟢 Easy (5x5)</option>
        <option value="medium">🟡 Medium (7x7)</option>
        <option value="hard">🔴 Hard (9x9)</option>
      </Form.Select>

      {loading ? (
        <div className="mt-4">
          <Spinner animation="border" variant="primary" />
          <p>Generating puzzle...</p>
        </div>
      ) : (
        <Button variant="success" onClick={handleGeneratePuzzle}>
          Generate New Puzzle
        </Button>
      )}
    </Container>
  );
};

export default TentsNewPage;
