import React, { useState, useEffect } from 'react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import Nav from '../Components/Nav';
import Sidebar from '../Components/Sidebar';
import {  store } from '../Components/FireBase';
import '../Components/CSS/Accounts.css';

import { doc, updateDoc, writeBatch } from 'firebase/firestore';




export default function AccountTable()  {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAllAccounts = async () => {
      const PersonalBio = await getDocs(query(collection(store, 'Userbio')));
      const userBioList = PersonalBio.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      if (userBioList.length > 0) {
        setAccounts(userBioList);
        console.log(accounts)
      }

    };

    getAllAccounts();
  }, []);




const handleDelete = async (uid) => {
  try {
    // Find the user document using the provided UID
    const queryRef = query(collection(store, 'Userbio'), where('uid', '==', uid));
    const querySnapshot = await getDocs(queryRef);

    if (!querySnapshot.empty) {
      // Get the first document from the query snapshot
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(store, 'Userbio', userDoc.id);

      // Update the blocked field
      await updateDoc(userRef, {
        blocked: true,
      });

      // Delete user's Userbio collection (if needed)

      // Update the accounts state by removing the blocked user
      setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== uid));
      window.location.reload();
    } else {
      console.error('User document not found.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

 

  return (
    <div>
      <Nav />
      <Sidebar />

      <h1 className='headerAccount'>Accounts</h1>
    <div className='AccountPAge'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>StudentID</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 &&
            accounts
              .filter((item) => !item.data.blocked) // Filter out blocked users
              .map((item) => (
            <tr key={item.id}>
              <td>{`${item.data.firstname} ${item.data.lastname}`}</td>
              <td>{item.data.email}</td>
              <td>{item.data.idstudent}</td>
              <td>{item.data.manager ? 'Yes' : 'No'}</td>
              <td>
                <button className="btnBlock" onClick={() => handleDelete(item.data.uid)}>❌</button>
              </td>
            </tr>
          ))}

        <h4>Blocked Users</h4>
                
        {accounts.length > 0 &&
          accounts
            .filter((item) => item.data.blocked)
            .map((item) => (
              <tr key={item.id}> 
                <td>{`${item.data.firstname} ${item.data.lastname}`}</td>
                <td>{item.data.email}</td>
                <td>{item.data.idstudent}</td>
              </tr>
            ))}

        </tbody>
      </table>  

      </div>

    </div>
  );
};


