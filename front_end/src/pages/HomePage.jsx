import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import sudImg from '../assets/sud.png';
import nonoImg from '../assets/nono.png';
import { useOutletContext, useNavigate } from "react-router-dom";
import { userLogIn } from "../utilities";
import { Form, Button } from 'react-bootstrap';

function HomePage() {
    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const { setUser } = useOutletContext();
      const navigate = useNavigate();
    
      const handleLogin = async (e) => {
        e.preventDefault();
        const loggedInUser = await userLogIn(email, password);
        if (loggedInUser) {
          setUser(loggedInUser);
          navigate('/profile');  //redirect
        } else {
          alert('Login failed. Check your credentials.');
        }
      };

  return (
    <div className="container text-center my-2">
      <div className="banner-container text-center">
        <h1 className="display-4 fw-semibold" style={{ color: '#8b4cad' }}>
          Welcome to PuzzleCraft!
        </h1>
      </div>
      
      <div className="rounded p-1">
        <p className="mb-0 fw-semibold">
      PuzzleCraft bridges the gap between casual relaxation and mental challenge by providing 
      an expansive library of logic puzzles, with multiple difficulty levels, 
      and progress tracking. Whether you're killing five minutes or spending your evening sharpening your 
      logical reasoning, PuzzleCraft makes it easy to experience the joy of mastering puzzles.
        </p>
      </div>

          <div className="row mb-3">
      </div>


      <div className="d-flex justify-content-center">
<div className="container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: 'black', fontSize: '16px' }}>Log in or create an account to get started!</h2>
  
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: '#8b4cad' }}>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: '#8b4cad' }}>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
    
            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: '#8b4cad',
                color: '#fff',
                border: 'none',
              }}
            >
              Log In
            </Button>
          </Form>
    
          <div className="mt-3 text-center">
            <small>Don't have an account? <a href="/signup/" style={{ color: '#8b4cad' }}>Sign up</a></small>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default HomePage;
