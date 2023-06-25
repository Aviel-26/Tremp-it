import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { City } from '../Components/Data';
import Select from 'react-select';
import {collection, getDocs, query, updateDoc, where} from 'firebase/firestore';
import { auth, store } from '../Components/FireBase';
import { getAuth, reauthenticateWithCredential, updatePassword , EmailAuthProvider} from 'firebase/auth';

export default function EditDetails() {
  const location = useLocation();
  const personalData = location.state;

  const navigate = useNavigate();

  const [uid, setUid] = useState(personalData.uid);
  const [firstName, setFirstName] = useState(personalData.firstname);
  const [lastName, setLastName] = useState(personalData.lastname);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ID, setID] = useState(personalData.id);
  const [studentID, setStudentID] = useState(personalData.idstudent);
  const [birth, setBirth] = useState(personalData.birth);
  const [gender, setGender] = useState(personalData.gender);
  const [city, setCity] = useState(personalData.city);
  const [phone, setPhone] = useState(personalData.phone);
  const [aboutMe, setAboutMe] = useState(personalData.about);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handlesLastNameChange = (e) => {
    setLastName(e.target.value);
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

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const cityShow=()=>{
    return City.find((option) => option.value === city);
  }

  const EditChanges = async (e) => {
    e.preventDefault();

    // Perform validations
    if (
      !firstName ||
      !lastName ||
      !ID ||
      !studentID ||
      !birth ||
      !gender ||
      !phone ||
      !city ||
      !aboutMe ||
      !password
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }

    if (firstName.length < 2 || lastName.length < 2) {
      alert('First Name and Last Name must have at least 2 characters.');
      return;
    }

    if (ID.length !== 8) {
      alert('ID must contain exactly 8 digits.');
      return;
    }
    if (phone.length !== 10) {
        alert('phone must contain exactly 10 digits.');
        return;
      }

    // Update personal details in Firestore
    const userBioRef = collection(store, 'Userbio');
    console.log(uid)
    const querySnapshot = await getDocs(query(userBioRef, where('uid', '==',  uid))
    
    );
    console.log(querySnapshot);
    if (querySnapshot.empty) {
      alert('User bio not found.');
      return;
    }

    const userBioDoc = querySnapshot.docs[0];
    await updateDoc(userBioDoc.ref, {
      firstname: firstName,
      lastname: lastName,
      id: ID,
      idstudent: studentID,
      birth: birth,
      gender: gender,
      phone: phone,
      city: city,
      about: aboutMe,
    });

    const user = auth.currentUser;
    const authCredential = EmailAuthProvider.credential(user.email, password);
  
    try {
      await reauthenticateWithCredential(user, authCredential);
      await updatePassword(user, password);
      console.log('Success')
      navigate('/Home');
    } catch (error) {
      console.log('Reauthentication error:', error);

    }
  };


  return (
    <div>
      <h1 id="headerBio">Edit Profile</h1>

      <form onSubmit={EditChanges}>
        <h4>Full Name:</h4>
        <input type="text" placeholder="Set First Name" value={firstName} onChange={handleFirstNameChange} required/>

        <h4>Last Name:</h4>
        <input type="text" placeholder="Set Last Name" value={lastName} onChange={handlesLastNameChange} required/>

        <h4>ID:</h4>
        <input type="text" placeholder="Set ID" value={ID} onChange={handleIDChange} required/>

        <h4>Student ID:</h4>
        <input type="text" placeholder="Set Student ID" value={studentID} onChange={handleStudentIDChange} required/>

        <h4>Birth:</h4>
        <input type="date" id="birthday" name="birthday" value={birth} onChange={handleBirthChange} required/>

        <div onChange={handleSetGenderChange}>
          <label>Gender:</label>
          <input type="radio" name="gender" id="g1" value="Male" checked={gender === 'Male'} required/>Male
          <input type="radio" name="gender"id="g2" value="Female" checked={gender === 'Female'}/>Female
        </div>

        <h4>Phone:</h4>
        <input type="text" placeholder="Set Phone" value={phone} onChange={handlePhoneChange} required />

        <h4 id="select">City:</h4>
        <Select id="selectSginUp" options={City} value={{ label: city, value: city }} onChange={handleCityChange} required/>


        <h4>About Me:</h4>
        <textarea type="text" placeholder="Set About Me" value={aboutMe} onChange={handleAboutMeChange} required/>

        <h4>New Password:</h4>
        <input type="password" placeholder="Set Password"  onChange={handlePasswordChange} required/>

        <h4>Confirm Password:</h4>
        <input type="password" placeholder="Confirm Password"  onChange={handleConfirmPasswordChange} required/>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
