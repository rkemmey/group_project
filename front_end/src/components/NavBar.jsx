import { Link } from "react-router-dom";
import { userLogOut } from "../utilities";
import "../App.css";
import { useNavigate } from 'react-router-dom';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Pixel Puzzle</h1>
      </div>
      <div className="navbar-right">
      <Link to={"/"}>Home</Link><br></br>
        {user ? (
          <>
            <Link to={"/sudoku/"}>Sudoku</Link><br></br>
            <Link to={"/nonogram/"}>Nonogram</Link><br></br>
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
