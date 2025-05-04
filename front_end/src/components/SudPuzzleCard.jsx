import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import sudImg from '../assets/sud.png';

const SudPuzzleCard = ({ id, puzzleArr }) => {
    const difficulty = puzzleArr['difficulty'];

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to={`/sudoku/${id}`} className="text-decoration-none text-dark">
            <div className="card h-100" style={{ backgroundColor: '#e0e0e0' }}>
              <div className="d-flex justify-content-center p-3">
                <img
                  src={sudImg}
                  alt={`Puzzle ${id}`}
                  style={{ width: '50%', height: 'auto' }} // shrink image size
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">Puzzle #{id}</h5>
                <p>Difficulty: {difficulty}</p>
              </div>
            </div>
          </Link>
        </div>
      );
};

export default SudPuzzleCard;
