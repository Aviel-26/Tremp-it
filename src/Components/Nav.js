import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './CSS/Nav.css';
import Logo from '../image/Logo.jpg';
import { auth } from '../Components/FireBase.js';
import { signOut } from 'firebase/auth';

export default function Nav() {
  const navigate = useNavigate();

  const handleSignOut = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully.');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  

  return (
    <div className="navigation">
      <nav id="nav">
        <img id="img" src={Logo} alt="Logo" />
        
        <ul>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li onClick={handleSignOut}><Link to="/">Signout</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
