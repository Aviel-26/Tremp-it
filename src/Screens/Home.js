import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Nav from '../Components/Nav'
import '../Components/CSS/Home.css'
import Sidebar from '../Components/Sidebar'
import Test from '../Components/CSS/Test'
import { City } from '../Components/Data'


export default function Home() {
  

  const [location, setLocation] = useState();
  const [destination, setDestination] = useState();

  const handleLocationChange = (e) => {
    if (e.value == destination){
        alert('Please select a deffrent Location.');
    } else{
      setLocation(e.value)
    }
};

const handleDestinatioChange = (e) => {
    if (e.value == location){
        alert('Please select a deffrent Destination.');
    } else{
        setDestination(e.value)
    }

  };
  // ----------------Date-------------------

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
  
  
  
  return (
    <div>

        <Nav/>
        <Sidebar/>
        
        <h2 className='header'> Search</h2>

        <div id='continer'>
          <div>
                <label id='select' type='text'>My location</label>
                <Select id='seLectHome'  options={City} onChange={handleLocationChange} required />
                <label type='text'>Destination</label>
                <Select id='seLectHome' options={City} onChange={handleDestinatioChange} required />
          </div>

        <button type='submit' className='BTNsearch'>Search 🔎 </button>
        
        
        
        <div>
          {weekDays.map((day, index) => (
            <div>
              <h3 key={index}>Date: {day}</h3>
                <table id='LiftTable'>
                  <th><h3>Name</h3></th>
                  <th><h3>Origin</h3></th>
                  <th><h3>Destination</h3></th>
                  <th><h3>Hour</h3></th>
                  <th><h3>comunication</h3></th>
                </table>             
            </div>
   
          ))}
       </div>





{/*         
        <h3>Date: {}</h3>
      <table id='LiftTable'>
          <th><h3>Name</h3></th>
          <th><h3>Origin</h3></th>
          <th><h3>Destination</h3></th>
          <th><h3>Hour</h3></th>
          <th><h3>comunication</h3></th>
          
      </table>
          */}
          </div>
    </div>
  )
}
