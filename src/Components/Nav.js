import React from 'react';
import { Link , Outlet} from 'react-router-dom';
import './CSS/Nav.css';
import Logo from '../image/Logo.jpg'

export default function Nav() {
  return (
    <div className="navigation">
      <nav id='nav'>
      <img id='img' src={Logo} alt="Logo" /> 
            <ul>
            <li> <Link to='/'> Home</Link></li>
            <li> <Link to='/singup'> Singup</Link></li>
            <li> <Link to='/login'>Login</Link></li>
            <li> <Link to='/about'>About</Link></li>
            </ul>

        </nav>
        <Outlet/>
        </div>
  )
}
