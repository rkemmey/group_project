import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Spinner, Container } from 'react-bootstrap';

const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000/api/kakuro'
  : '/api/kakuro';

const KakuroNewPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGeneratePuzzle = () => {
    setLoading(true);
    axios.post(`${API_BASE_URL}/generate/`, { difficulty: 'easy' })
      .then(res => {
        if (res.data?.id) {
          navigate(`/kakuro/${res.data.id}`);
        } else {
          alert("Puzzle generated but no ID returned.");
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("❌ Failed to generate puzzle:", err);
        alert("❌ Could not generate a new puzzle.");
        setLoading(false);
      });
  };

  return (
    <Container className="text-center mt-5">
      <h3>Create a New Kakuro Puzzle</h3>
      {loading ? (
        <div className="mt-4">
          <Spinner animation="border" variant="primary" />
          <p>Generating puzzle...</p>
        </div>
      ) : (
        <Button variant="success" className="mt-3" onClick={handleGeneratePuzzle}>
          Generate New Puzzle
        </Button>
      )}
    </Container>
  );
};

export default KakuroNewPage;
