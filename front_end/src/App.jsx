import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Outlet, useLoaderData, useLocation } from 'react-router-dom'
import { api, getProfile } from './utilities'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //const loadedUser = useLoaderData();
  const [user, setUser] = useState(null);
  const location = useLocation(); 
  const showNavbar = location.pathname !== '/';  // hide navbar on homepage

  useEffect(() => {
    const checkUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await getProfile();  
          setUser(user);
        } catch (err) {
          console.error("Failed to restore user from token", err);
        }
      }
    };
  
    checkUserFromToken();
  }, []);


  useEffect(() => {
    console.log('<App/> state user ', user)
  }, [user])


  return (
    <>
      {showNavbar && <NavBar user={user} setUser={setUser}/>}
      <Outlet context={{ user, setUser }}/>
    </>
  )
}

export default App
