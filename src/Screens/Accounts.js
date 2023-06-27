import React, { useState, useEffect } from 'react';
import { getDocs, query, collection, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Nav from '../Components/Nav';
import Sidebar from '../Components/Sidebar';
import { store } from '../Components/FireBase';
import '../Components/CSS/Accounts.css';

export default function AccountTable() {
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
        console.log(accounts);
      }
    };

    getAllAccounts();
  }, []);

  const handleDelete = async (uid) => {
    try {
      // Get all the collection names from today onwards
      const currentDate = new Date();
      const collectionNames = [];

      for (let i = 0; i < 6; i++) {
        const nextDay = new Date();
        nextDay.setDate(currentDate.getDate() + i);

        if (nextDay.getDay() !== 6) {
          const collectionName = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')}`;
          collectionNames.push(collectionName);
        }
      }

      // Update the blocked field in the Userbio collection
      const userQueryRef = query(collection(store, 'Userbio'), where('uid', '==', uid));
      const userQuerySnapshot = await getDocs(userQueryRef);

      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0];
        const userRef = doc(store, 'Userbio', userDoc.id);
        const currentBlockedValue = userDoc.data().blocked;

        await updateDoc(userRef, {
          blocked: !currentBlockedValue,
        });
      }

      // Iterate over each collection (excluding Userbio) and delete the user's document
      for (const collectionName of collectionNames) {
        if (collectionName !== 'Userbio') {
          const queryRef = query(collection(store, collectionName), where('uid', '==', uid));
          const querySnapshot = await getDocs(queryRef);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userRef = doc(store, collectionName, userDoc.id);

            await deleteDoc(userRef);
          }
        }
      }

      // Update the accounts state by removing the blocked user
      setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== uid));

      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const setManager = async (uid) => {
    try {
      const userbioQueryRef = query(collection(store, 'Userbio'), where('uid', '==', uid));
      const userbioQuerySnapshot = await getDocs(userbioQueryRef);

      if (!userbioQuerySnapshot.empty) {
        const userDoc = userbioQuerySnapshot.docs[0];
        const userRef = doc(store, 'Userbio', userDoc.id);
        const currentManagerValue = userDoc.data().manager;
       
        await updateDoc(userRef, {
          manager: !currentManagerValue,
        });

        window.location.reload();
      }
    } catch (error) {
      console.error('Error setting manager:', error);
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
              <th>Block</th>
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
                      <button className='btnBlock' onClick={() => handleDelete(item.data.uid)}>⛔</button>
                    </td>
                    <td>
                      <button className='btnBlock' onClick={() => setManager(item.data.uid)}>✅</button>
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
                    <td><button className='btnInitialize' onClick={() => handleDelete(item.data.uid)}>↩️</button></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
