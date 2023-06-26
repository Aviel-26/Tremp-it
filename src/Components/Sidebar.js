import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../Components/CSS/Sidebar.css'
import Managerbar from './Managerbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, store } from './FireBase';
import { collection, getDocs, query, where } from 'firebase/firestore';




export default function Sidebar() {
  
  const [uid, setUid] = useState(null);
  const [manager, setManager] = useState(false);

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
      
      console.log(userBioList[0].data.manager)

      if (userBioList.length > 0 && userBioList[0].data.manager ) {
        setManager(true);
      }
      
    };

    getUsersData();
  }, [uid]);

  return (
    <div className='continer-Side-Bar'>
       <div id='bar'>
        <ul>
            <li> <Link to='/Add'> Add</Link></li>
            <li> <Link to='/Details'> Details</Link></li>
            <li> <Link to='/login'>Settings</Link></li>
        </ul>
        {manager && <Managerbar />}
        </div>

    </div>
  )
}
