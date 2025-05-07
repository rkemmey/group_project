import { Link } from "react-router-dom";
import { userLogOut } from "../utilities";
import "../App.css";
import { useNavigate } from 'react-router-dom';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>PuzzleCraft</h1>
      </div>
      <div className="navbar-right">
      <Link to={"/"}>Home</Link><br></br>
        {user ? (
          <>
            <Link to={"/sudoku/"}>Sudoku</Link><br></br>
            <Link to={"/nonogram/"}>Nonogram</Link><br></br>
            <Link to={"/2048/"}>2048</Link><br></br>
            <Link to={"/puzzle-15/"}>15 Tiles</Link><br></br>
            <Link to={"/dashboard/"}>Dashboard</Link><br></br>
            <Link to={"/profile/"}>Profile</Link>
            <button 
              onClick={ async () => 
                {await userLogOut();
                 setUser(null);
                 navigate('/'); 
              }}>Log Out</button>
            <span>{user ? user.email : ""}</span>
          </>
        ) : (
          <>
            <Link to={"/signup/"}>Signup</Link><br></br>
            <Link to={"/login/"}>Login</Link><br></br>
          </>
        )}
      </div>
    </nav>
  );
}



{/* <Link to={"/"}>Home</Link><br></br>
        <Link to={"/signup/"}>Signup</Link><br></br>
        <Link to={"/login/"}>Login</Link><br></br>
        <Link to={"/sudoku/"}>Sudoku</Link><br></br>
        <Link to={"/nonogram/"}>Nonogram</Link><br></br>
        <Link to={"/profile/"}>Profile</Link>
        <button onClick={async () => setUser(await userLogOut())}>Log Out</button>
        <span>{user ? user.email : ""}</span> */}
