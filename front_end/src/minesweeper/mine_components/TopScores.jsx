// TopScores.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const TopScores = () => {
  const [topScores, setTopScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the top scores when the component is mounted
  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/minewordle/user_top_scores/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setTopScores(response.data);
      } catch (err) {
        setError('Failed to fetch top scores');
        console.log(`${err}`)
      } finally {
        setLoading(false);
      }
    };

    fetchTopScores();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Top Scores</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {topScores.map((score) => (
            <tr key={score.id}>
              <td>{score.user}</td>
              <td>{score.score}</td>
              <td>{score.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScores;

