import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Nav from '../Components/Nav'
import '../Components/CSS/Home.css'
import Sidebar from '../Components/Sidebar'
import { City } from '../Components/Data'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { store, auth } from '../Components/FireBase'
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  const [location, setLocation] = useState();
  const [destination, setDestination] = useState();

  const handleLocationChange = (e) => {
    if (e.value === destination) {
      alert('Please select a different Location.');
    } else {
      setLocation(e.value);
    }
  };

  const handleDestinationChange = (e) => {
    if (e.value === location) {
      alert('Please select a different Destination.');
    } else {
      setDestination(e.value);
    }
  };

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


// const [allUsersData, setallUsersData] = useState();

// useEffect(() => {
//   const getDB = async (store) => {
//     const userBio = await getDocs(collection(store, 'Userbio'));

//     const userBioList = userBio.docs.map((doc) => ({
//       id: doc.id,
//       data: doc.data()
//     }));

//     setallUsersData(userBioList);
//     console.log(' allUsersData      ');
//     console.log( userBioList);
//   };

//   getDB(store);
// }, []);


// const [userDetails, setuserDetails] = useState(null);

// const getUserDetails = (uid) => {
//   const user = allUsersData.find((user) => user.id === uid);
//   return user ? user : null;
// };

//   const handleSearchUser = (uid) => {
//     const userDetails = getUserDetails(uid);
//     setuserDetails(userDetails);
//     console.log(' OneSserDetailsEach   ');
//     console.log(userDetails);
//   };

//   const getUserName= (uid)=>{
//     const D =handleSearchUser(uid);
//     console.log("User name")
//     console.log(D.firstname)
//     return D.firstname
//   }

const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      const userBio = await getDocs(collection(store, 'Userbio'));
      const userBioList = userBio.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setAllUsersData(userBioList);
      console.log('All Users Data:');
      console.log(userBioList);
    };

    getUsersData();
  }, []);

  const getUserDetails = (uid) => {
    console.log(uid);
    const user = allUsersData.find((user) => user.data.uid === uid);
    console.log('allUsersDataFunc');
    console.log(allUsersData);
    console.log('user');
    console.log(user);
    return user ? user : null;
  };

  const getUserName = (uid) => {
    const userDetails = getUserDetails(uid);
    if (userDetails && userDetails.data) {
      console.log(userDetails.data.firstname);
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
    <div>
      <Nav />
      <Sidebar />

      <h2 className="header"> Search</h2>

      <div id="continer">
        <div>
          <label id="select" type="text">
            My location
          </label>
          <Select
            id="seLectHome"
            options={City}
            onChange={handleLocationChange}
            required
          />
          <label type="text">Destination</label>
          <Select
            id="seLectHome"
            options={City}
            onChange={handleDestinationChange}
            required
          />
        </div>

        <button type="submit" className="BTNsearch">
          Search 🔎
        </button>

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
