import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import Sidebar from '../Components/Sidebar'
import '../Components/CSS/Details.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, store } from '../Components/FireBase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Details() {
  
  
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const [personalData, setPersonalData] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      const PersonalBio = await getDocs(query(collection(store, 'Userbio'), where('uid', '==', uid)));
      const userBioList = PersonalBio.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setPersonalData(userBioList[0].data);
      // console.log(userBioList[0].data.firstname)
    };
    

    getUsersData();
  }, []);

  
    return (
     
    <div>
        <Nav/>
        <Sidebar/>

        <h1 id='headerBio'>Personal Details</h1>
        <form id='BioForm'>
          <h4>Full Name: {personalData.firstname} { personalData.lastname} </h4>
          <h4>ID:        {personalData.id}  </h4>
          <h4>StudentID: {personalData.idstudent}  </h4>
          <h4>Birth:     {personalData.birth} </h4>
          <h4>Gender:    {personalData.gender} </h4>
          <h4>Email:     {personalData.email}  </h4>
          <h4>Phone:     {personalData.phone}  </h4>
          <h4>Password:  {personalData.password} </h4>
          <h4>About Me:  {personalData.about} </h4>

          <button type='submit' >Edit</button>
        </form>

    </div>
  )
}
