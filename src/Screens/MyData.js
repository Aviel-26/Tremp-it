import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav';
import Sidebar from '../Components/Sidebar';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, store } from '../Components/FireBase';
import { onAuthStateChanged } from 'firebase/auth';

export default function MyData() {
    const [myRides, setMyRides] = useState([]);
    const [uid, setUid] = useState(null);
    const [futureDates, setFutureDates] = useState([]);
  
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
    const currentDate = new Date();
    const dates = [];

    for (let i = 0; i < 30; i++) {
      const nextDay = new Date();
      nextDay.setDate(currentDate.getDate() + i);
      const collectionName = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')}`;
      dates.push(collectionName);
    }

    setFutureDates(dates);
  }, []);
  
   
    
    useEffect(() => {
      const fetchMyRides = async () => {
        try {
          const ridesData = [];
  
          for (const collectionName of futureDates) {
            const ridesQueryRef = query(collection(store, collectionName), where('uid', '==', uid));
            const ridesSnapshot = await getDocs(ridesQueryRef).catch((error) => {
              console.error('Error getting rides:', error);
              throw error;
            });
  
            if (!ridesSnapshot.empty) {
              const ridesInCollection = ridesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(), // Spread the document data
              }));
  
              ridesData.push(...ridesInCollection);
            }
          }
  
          setMyRides(ridesData);
        } catch (error) {
          console.error('Error fetching rides:', error);
        }
      };
  
      fetchMyRides();
    }, [uid]); // Add uid as a dependency to fetch data when it changes
  
    const handleDelete = async (uid, date, time) => {
        try {
          const ridesQueryRef = query(
            collection(store, date),
            where('uid', '==', uid),
            where('time', '==', time)
          );
          const ridesSnapshot = await getDocs(ridesQueryRef);
      
          if (!ridesSnapshot.empty) {
            const rideDoc = ridesSnapshot.docs[0]; // Assuming there's only one document matching the query
            await deleteDoc(rideDoc.ref);
            setMyRides((prevRides) =>
              prevRides.filter((ride) => ride.uid !== uid || ride.date !== date || ride.time !== time)
            );
          }
        } catch (error) {
          console.error('Error deleting ride:', error);
        }
      };
      
    return (
    <div>

        <Nav/>
        <Sidebar/>
        
        
        <h1 className='headerAccount'>My Rides for the Next Month</h1>
        <div className='AccountPAge'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
          {myRides.length > 0 &&
  myRides
    .filter((item) => !item.blocked) // Filter out blocked rides
    .map((item) => (
      <tr key={item.id}>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>{item.origin}</td>
        <td>{item.destination}</td>
        <td>
          <button className='btnBlock' onClick={() => handleDelete(item.uid , item.date , item.time)}>⛔</button>
        </td>
      </tr>
    ))

}
</tbody>

        </table>
        </div>
    </div>
  )
}
