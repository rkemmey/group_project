import React from 'react';
import { Link } from 'react-router-dom';
import sudImg from '../assets/sud.png';
import nonoImg from '../assets/nono.png';

function HomePage() {
  return (
    <div className="container text-center my-2">
      <div className="banner-container text-center">
        <h1 className="display-4 fw-semibold" style={{ color: '#8b4cad' }}>
          Welcome to Pixel Puzzles!
        </h1>
      </div>
      
      <div className="rounded p-1 mb-4">
        <p className="mb-0 fw-semibold">
      Pixel Puzzles bridges the gap between casual relaxation and mental challenge by providing 
      an expansive library of nonogram and sudoku puzzles, with multiple difficulty levels, 
      and progress tracking. Whether you're a beginner or a seasoned solver, our platform makes 
      it easy to dive into the world of nonograms and experience the joy of uncovering pixel-perfect art through logic.
        </p>
      </div>

          <div className="row mb-3">
      <div className="col-md-6 mb-1">
        <Link to="/about-sudoku" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">Learn About Sudoku</h5>
                <img 
                  src={sudImg} 
                  style={{ width: '20%', height: 'auto' }} />
              <p className="card-text">
                Explore the history, rules, and strategies behind the classic logic game of Sudoku.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-6 mb-1">
        <Link to="/about-nonogram" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <h5 className="card-title">Learn About Nonograms</h5>
              <img 
                src={nonoImg} 
                style={{ width: '20%', height: 'auto' }} />
              <br></br>
              <p className="card-text">
                Discover how to solve nonograms and uncover pixel art using logic and numerical clues.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>


      <p className="p-1 fw-semibold">
        Please log in or create an account to get started.
      </p>
      <div className="d-flex justify-content-center gap-4 mt-1">
        <Link
          to="/login"
          className="btn btn-md"
          style={{
            backgroundColor: '#8b4cad',
            color: '#fff',
            border: 'none',
          }}
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="btn btn-outline btn-md"
          style={{
            border: '2px solid #8b4cad',
            color: '#8b4cad',
          }}
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
