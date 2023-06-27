import React, { useState } from 'react'
import '../Components/CSS/Login.css'
import { Link , useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, store} from '../Components/FireBase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import logoLogin from '../image/logoLogin.jpg';

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
  

  const login = async (event) => {
  event.preventDefault();

  signInWithEmailAndPassword(auth, Email, password)
    .then(async (userCredential) => {
      const uid = userCredential.user.uid;

      // Check if the user is blocked
      const userBioQuery = query(collection(store, 'Userbio'), where('uid', '==', uid));
      const userBioSnapshot = await getDocs(userBioQuery);

      if (!userBioSnapshot.empty) {
        const userBioDoc = userBioSnapshot.docs[0];
        const isBlocked = userBioDoc.data().blocked;

        if (isBlocked) {
          alert('You are blocked from this web.');
          return;
        }
      }

      console.log(userCredential);
      console.log(`User ${uid} connected: Hello nice user, welcome to the web`);
      setUid(uid);
      navigate('/Home', { state: uid });
    })
    .catch((error) => {
      alert('Email or password incorrect');
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

      <img className='logoLogin' src={logoLogin} alt="logoLogin" />
      
    </div>
  )
}
