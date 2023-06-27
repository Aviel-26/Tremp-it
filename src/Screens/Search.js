import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import Sidebar from '../Components/Sidebar'
import Select from 'react-select'
import { City } from '../Components/Data'
import '../Components/CSS/Search.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { store } from '../Components/FireBase'

export default function Search() {
  
    const [location, setLocation] = useState();
    const [destination, setDestination] = useState();
    const [date, setDate] = useState();
    const [lifts, setLifts] = useState([]);

    const handleLocationChange = (e) => {
        if (e.value === destination && e.value!== '') {
        alert('Please select a different Location.');
        } else {
        setLocation(e.value);
        }
    };

    const handleDestinationChange = (e) => {
        if (e.value === location && e.value!== '') {
        alert('Please select a different Destination.');
        } else {
        setDestination(e.value);
        }
    };


    const handlesetDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();
        const sixDaysFromNow = new Date();
        today.setHours(0, 0, 0, 0); 
        sixDaysFromNow.setDate(today.getDate() + 6);
        sixDaysFromNow.setHours(23, 59, 59, 999); 
      
        if (selectedDate >= today && selectedDate <= sixDaysFromNow) {
          const year = selectedDate.getFullYear();
          const month = selectedDate.getMonth() + 1; 
          const day = selectedDate.getDate();
      
          const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          setDate(formattedDate);
        } else {
          setDate('');
          alert('Please select a date between today and 6 days from now');
        }
      };

    const handleSearch = async (e) => {
        e.preventDefault();
      
        const locationValue = location;
        const destinationValue = destination;
        const dateValue = date;
        console.log(dateValue)      
        try {
          // Create a base query to fetch the data
          let baseQuery = query(collection(store, dateValue));
      
          // Add conditions to the query based on the selected parameters
          if (locationValue) {
            baseQuery = query(baseQuery, where('origin', '==', locationValue));
          }
          if (destinationValue) {
            baseQuery = query(baseQuery, where('destination', '==', destinationValue));
          }
      
          // Execute the query and get the documents
          const querySnapshot = await getDocs(baseQuery);
          const data = querySnapshot.docs.map((doc) => doc.data());
      
          console.log('Fetched data:', data);
          setLifts(data)
          // Perform further processing with the fetched data, such as updating state or rendering it in your component
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle the error appropriately
        }
      };

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
    <div>
        <Nav/>
        <Sidebar/>

        <h1 className='headerSearch'>Search a Lift</h1>
       
        <div className ='continerSearch'>
            <form onSubmit={handleSearch}>
        <div className='setSearch'>
          <label className='labelName' type="text">My location</label>
          <Select
            className='seLectHome'
            // id="seLectHome"
            options={City}
            onChange={handleLocationChange}
          />
          <label  className='labelName'  type="text">Destination</label>
          <Select
          className='seLectHome'
            // id="seLectHome"
            options={City}
            onChange={handleDestinationChange}
          />
          <input type="date" className='dateDesgin' required onChange={handlesetDateChange}/>

        <button type="submit" className="BTNsearch"> Search 🔎</button>
        </div>
        </form>


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
                    {lifts.length > 0 ? (
                        lifts.map((item) => (
                        <tr key={item.id}>
                            <td>{item.origin} </td>
                            <td>{item.destination}</td>
                            <td>{getUserName(item.uid)}</td>
                            <td>{item.time}</td>
                            <td>{getUserPhone(item.uid)}</td>
                            <td>{item.marks}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="6">No lifts found</td>
                        </tr>
                    )}
                </tbody>
        </table>
        </div>
    </div>
  )
}
