import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import nonoImg from '../assets/nono.png';

const NonoPuzzleCard = ({ id, imgUrl }) => {

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to={`/nonogram/${id}`} className="text-decoration-none text-dark">
            <div className="card h-100" style={{ backgroundColor: '#e0e0e0' }}>
              <div className="d-flex justify-content-center p-3">
                <img
                  src={imgUrl}
                  alt={`Puzzle ${id}`}
                  style={{ width: '50%', height: 'auto' }} // shrink image size
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">Puzzle #{id}</h5>
              </div>
            </div>
          </Link>
        </div>
      );
};

export default NonoPuzzleCard;
