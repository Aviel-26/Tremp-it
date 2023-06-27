import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import Sidebar from '../Components/Sidebar'
import { collection, getDocs } from 'firebase/firestore'
import { store } from '../Components/FireBase'
import '../Components/CSS/Home.css'


export default function Home() {

  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const days = [];
    const currentDate = new Date();

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + i);

      if (nextDay.getDay() !== 6) {
        days.push(nextDay.toLocaleDateString());
      }
    }

    setWeekDays(days);
  }, []);

  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    const getDB = async (store) => {
      const today = new Date();
      const collectionNames = [];

      for (let i = 0; i < 6; i++) {
        const nextDay = new Date();
        nextDay.setDate(today.getDate() + i);

        if (nextDay.getDay() !== 6) {
          const collectionName = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1).toString().padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')}`;
          collectionNames.push(collectionName);
        }
      }

      const snapshotPromises = collectionNames.map((collectionName) =>
        getDocs(collection(store, collectionName))
      );
      const snapshots = await Promise.all(snapshotPromises);

      const dayData = snapshots.map((snapshot) => {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
      });

      setDayData(dayData);
      
    };

    getDB(store);
  }, []);


// -----------------------------------------------------------------

const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      const userBio = await getDocs(collection(store, 'Userbio'));
      const userBioList = userBio.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setAllUsersData(userBioList);
    };

    getUsersData();
  }, []);

  const getUserDetails = (uid) => {
    const user = allUsersData.find((user) => user.data.uid === uid);
    return user ? user : null;
  };

  const getUserName = (uid) => {
    const userDetails = getUserDetails(uid);
    if (userDetails && userDetails.data) {
      const fullName = userDetails.data.firstname +' '+ userDetails.data.lastname;
      return fullName ;
    }
    return '';
  };

  const getUserPhone = (uid) => {
    const userDetails = getUserDetails(uid);
    if (userDetails && userDetails.data) {
      return userDetails.data.phone;
    }
    return '';
  }
// -----------------------------------------------------------------
  return (
    <div className='top'>
      <Nav />
      <Sidebar />

      <h2 className='headerHome'> Home</h2>

      <div id="continer">
        <div>
          {weekDays.map((day, index) => (
            <div key={index}>
              <h3>Date: {day}</h3>
              <table id="LiftTable">
                <thead>
                  <tr>
                    <th><h3>Origin</h3></th>
                    <th><h3>Destination</h3></th>
                    <th><h3>Name</h3></th>
                    <th><h3>⏰</h3></th>
                    <th><h3>☎️</h3></th>
                    <th><h3>Marks</h3></th>
                  </tr>
                </thead>
                <tbody>
                  {dayData[index] &&
                    dayData[index].map((item) => (
                      <tr key={item.id}>
                        <td>{item.data.origin}</td>
                        <td>{item.data.destination}</td>
                        <td>{getUserName(item.data.uid)}</td>
                        <td>{item.data.time}</td>
                        <td>{getUserPhone(item.data.uid)}</td>
                        <td>{item.data.note}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}