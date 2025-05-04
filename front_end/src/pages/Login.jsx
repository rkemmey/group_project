import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { userLogIn } from "../utilities";
import { Form, Button } from 'react-bootstrap';

const Login = () => {
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

  // return (
  //   <>
  //     <h1>LogIn</h1>
  //     <form onSubmit={handleLogin}>
  //     <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
  //     <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
  //     <button type="submit">Log In</button>
  //   </form>
  //   </>
  // );
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: '#8b4cad' }}>Log In</h2>
  
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
  );
};

export default Login;
