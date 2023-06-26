import React, { useEffect, useState } from 'react';
import Nav from '../Components/Nav';
import Sidebar from '../Components/Sidebar';
import '../Components/CSS/Details.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, store } from '../Components/FireBase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Details() {
  
  const [uid, setUid] = useState(null);
  const [personalData, setPersonalData] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const getUsersData = async () => {
      const PersonalBio = await getDocs(
        query(collection(store, 'Userbio'), where('uid', '==', uid))
      );
      const userBioList = PersonalBio.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      if (userBioList.length > 0) {
        setPersonalData(userBioList[0].data);
      }
    };

    getUsersData();
  }, [uid]);
  
  const handleEdit=()=>{
    console.log('personalData')
    console.log(personalData)
    navigate('/Details/EditDetails', {state: personalData })
  }



  return (
    <div>
      <Nav />
      <Sidebar />

      <h1 id="headerBio">Personal Details</h1>
      <form className="BioForm">

        <table id = 'showTable'>

          <tr> 
            <td><h4>  Full Name:  </h4></td>
            <td><h4>   {personalData.firstname} {personalData.lastname} </h4></td>
          </tr>

          <tr> 
            <td><h4>  ID:  </h4></td>
            <td><h4>   {personalData.id} </h4></td>
          </tr>

          <tr> 
            <td><h4>  StudentID:   </h4></td>
            <td><h4>   {personalData.idstudent} </h4></td>
          </tr>

          <tr> 
            <td><h4>  Birth:   </h4></td>
            <td><h4>   {personalData.birth} </h4></td>
          </tr>

          <tr> 
            <td><h4> City:   </h4></td>
            <td><h4>    {personalData.city} </h4></td>
          </tr>

          <tr> 
            <td><h4>  Gender:  </h4></td>
            <td><h4>    {personalData.gender} </h4></td>
          </tr>

          <tr> 
            <td><h4>  Email:   </h4></td>
            <td><h4>  {personalData.email}  </h4></td>
          </tr>

          <tr> 
            <td><h4> Phone:    </h4></td>
            <td><h4>  {personalData.phone}  </h4></td>
          </tr>

          <tr> 
            <td><h4> Password:    </h4></td>
            <td><h4> {personalData.password}   </h4></td>
          </tr>

          <div className='abtMe'>

            <h4>  About Me:  </h4>
             <p className='pText'>{personalData.about}</p>
          
             </div>

        <button className='btnSave' type="submit" onClick={handleEdit}>Edit</button>

        </table>

      </form>
    </div>
  );
}




     {/* Render the content when personalData is available */}
        {/* <h4>Full Name: {personalData.firstname} {personalData.lastname}</h4>
        <h4>ID: {personalData.id}</h4>
        <h4>StudentID: {personalData.idstudent}</h4>
        <h4>Birth: {personalData.birth}</h4>
        <h4>City: {personalData.city}</h4>
        <h4>Gender: {personalData.gender}</h4>
        <h4>Email: {personalData.email}</h4>
        <h4>Phone: {personalData.phone}</h4>
        <h4>Password: {personalData.password}</h4>
        <h4>About Me:</h4>
        <h4> {personalData.about}</h4> */}