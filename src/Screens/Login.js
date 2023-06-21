import React, { useState } from 'react'
import '../Components/CSS/Login.css'
import { Link , useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../Components/FireBase.js';

export default function Login() {

    const navigate = useNavigate();
  
   const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUid] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    /// Nevigate to Singup
    const handleSignup =() =>{
      navigate('/Singup' )
    }
  
    const login = async (event) => {
      event.preventDefault();
      signInWithEmailAndPassword(auth,Email,password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log( "user " + userCredential.user.uid  + "  conected: Hello nice user welcom to the web")
        setUid(userCredential.user.uid);
        navigate('/Home', {state: userCredential.user.uid} )
  
      }).catch((error) => {
        console.log(error);
        
      });
    };

  
  return (
    <div>

      <h1 id='headerLog'>Login</h1>
      
      <form id='formLogin' onSubmit={login}>
      <ul>
        <li><input type="email"   placeholder=' 📧  Email' onChange={handleEmailChange} required/></li>
        <li><input type="password"  placeholder='🔒  Password' minLength="6" onChange={handlePasswordChange} required /></li>
        
        <input type="checkbox" className='remmber' id='check' />Remmber me?

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
