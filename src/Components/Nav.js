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
            <li> <Link to='/'>About</Link></li>
            </ul>

        </nav>
        <Outlet/>
        </div>
  )
}


{/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
<li className="nav-item"> <Link className="nav-link" to='/'>Home</Link></li>
<li className="nav-item"> <Link className="nav-link" to='/add'>Add</Link></li>
<li className="nav-item"> <Link className="nav-link" to='/store'>Store</Link></li>
</ul>  */}