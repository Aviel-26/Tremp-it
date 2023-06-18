import React from 'react'
import '../Components/CSS/Login.css'
import { Link , Outlet} from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <h1 className='header'>Login</h1>
      
      <form id='formLogin'>
      <ul>
        <li><input type="email" id="email" name="email" placeholder=' 📧  Email'/></li>
        <li><input type="password" id="pass" pla="password" placeholder='🔒  Password' minlength="8" required/></li>
        
        <input type="checkbox" id='check' />
        <label class="container">Remmber me?</label>

      </ul>

      <button type='submit' className='logBtn'>Log in</button>
      
      
      <hr/>
      <div className='divSinin'>
      <label>Not a member?   |</label>
      <Link to='/singup' className='link1'>  Singup </Link>
      </div>
      </form>
      
    </div>
  )
}
