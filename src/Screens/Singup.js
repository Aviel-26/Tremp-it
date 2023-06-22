import React, { useState } from 'react';
import '../Components/CSS/Singup.css';
import { useNavigate,Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { store ,auth } from '../Components/FireBase.js';
import { addDoc, collection } from 'firebase/firestore';
import Select from 'react-select'
import { City } from '../Components/Data';


export default function Singup() {
//  -----------------------
  const navigate = useNavigate();
  
//  -----------------------

  const [Email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ID, setID] = useState();
  const [studentID, setStudentID] = useState();
  const [birth, setBirth] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  // const [photo, setPhoto] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [phone, setPhone] = useState();
  const [aboutMe, setAboutMe] = useState();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handlesLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleIDChange = (e) => {
    setID(e.target.value);
  };
  const handleStudentIDChange = (e) => {
    setStudentID(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleBirthChange = (e) => {
    setBirth(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.value);
  };
  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };

  const handleSetGenderChange = (e) => {
    setGender(e.target.value);
  };

  const signup = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, Email, password);
      console.log(userCredential);
      const documentId = userCredential.user.uid;

      await addDoc(collection(store, 'Userbio'), {
        uid: documentId,
        firstname: firstName,
        lastname: lastName,
        email: Email,
        password: password,
        id: ID ,
        idstudent: studentID,
        phone: phone,
        birth: birth,
        gender: gender,
        // city: city,
        // street: street,
        about: aboutMe
      });
      navigate('/', documentId);
    } catch (error) {
      console.log(error);
    }
  };


  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <h1 id='headerLog'>Signup</h1>
      <form id="formSignup" onSubmit={signup}>
        <ul>
          <li>
            <input type="text" placeholder="First Name" onChange={handleFirstNameChange} required />
            <input type="text" placeholder="Last Name" onChange={handlesLastNameChange} required/>
          </li>

          <li>
            <input type="email" id="email" name="email" placeholder="Email" onChange={handleEmailChange} required/>
            <input type="password" id="password" name="password" placeholder="Password" onChange={handlePasswordChange} required/>
          </li>

          <li>
            <input type="text" placeholder="Id number" onChange={handleIDChange} required/>
            <input type="text" placeholder="StudentID" onChange={handleStudentIDChange} required/>
          </li>

          <li>
            <input type="tel" id="phone" name="phone" placeholder="Phone" onChange={handlePhoneChange}  required/>
            <input type="date" id="birthday" name="birthday" onChange={handleBirthChange} required/>
          </li>

          <li>
            <div onChange={handleSetGenderChange}>
              <label>Gender:</label>
              <input type="radio" name="gender" id="g1" value='Male' required/>Male
              <input type="radio" name="gender" id="g2" value='Female' />Female
            </div>

          </li>

          <li>
            <label id="select">City:</label>
            <Select id='selectSginUp'  options={City} onChange={handleCityChange} required /> 
          </li>

          <li>
            <label>About Me:</label>
          </li>
          <li>
            <textarea placeholder="Type here..." onChange={handleAboutMeChange} />
          </li>

          <button type="submit" className="send">Send</button>
          
          <div className='divSinin'>
          <label>have an account?   |</label>
           <Link to='/' className='link1'>Login</Link>
      </div>
        </ul>
      </form>

    </div>
  );
}