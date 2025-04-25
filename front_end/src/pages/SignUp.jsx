import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useOutletContext, useNavigate } from "react-router-dom";
import { userRegistration } from "../utilities";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await userRegistration(email, password);
    if (user) {
        setUser(user)
        navigate('/profile');  //redirect
    } else {
      alert('Signup failed.');
    }  
  };

  // 
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: '#8b4cad' }}>Sign Up</h2>
  
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: '#8b4cad' }}>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
              border: 'none'
            }}
          >
            Sign Up
          </Button>
        </Form>
  
        <div className="mt-3 text-center">
          <small>Already have an account? <a href="/login/" style={{ color: '#8b4cad' }}>Log in</a></small>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
