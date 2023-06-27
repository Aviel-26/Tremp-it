import React, {  useEffect, useState } from 'react'
import { houre, City } from '../Components/Data'
import Select from 'react-select'
import '../Components/CSS/Add.css'
import Sidebar from '../Components/Sidebar'
import Nav from '../Components/Nav'
import { addDoc, collection } from 'firebase/firestore'
import { store, auth  } from '../Components/FireBase'
import {  useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';


export default function Add() {

    const navigate = useNavigate();

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

   
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [note, setNote] = useState();
    
    const handleOriginChange = (e) => {
        if (e.value == destination){
            alert('Please select a deffrent Destination.');
        } else{
            setOrigin(e.value)
        }
    };

    const handleDestinatioChange = (e) => {
        if (e.value == origin){
            alert('Please select a deffrent Destination.');
        } else{
            setDestination(e.value)
        }

      };

      const handlesetTimeChange = (e) => {
        const selectedTime = e.value;
        const selectedDate = date; // Replace 'date' with the appropriate variable that holds the selected date value
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
      
        // Set the selected date and time
        const selectedDateTime = new Date(`${selectedDate} ${selectedTime}`).getTime();
      
        // Compare the selected date with the current date
        if (selectedDateTime < currentDate.getTime()) {
          return alert('Choose a future date.');
        } else if (selectedDate === currentDate.toLocaleDateString()) {
          // If the selected date is today, compare the selected time with the current time
          if (selectedDateTime <= currentTime) {
            return alert('Please select a future time.');
          }
        }
      
        // Proceed with setting the selected time
        setTime(selectedTime);
      };
      


      const handlesetDateChange = (e) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to midnight
      
        const selectedDate = new Date(e.target.value);
        selectedDate.setHours(0, 0, 0, 0); // Set the time to midnight
      
        const dayOfWeek = selectedDate.getDay();
        const selectedDateString = selectedDate.toLocaleDateString('en-US');
      
        if (selectedDate < today || dayOfWeek === 6) {  // Saturday
          alert('Please select a future date.');
        } else {
          setDate(e.target.value);
        }
      };
        
  const handlesetNoteChange = (e) => {
      setNote(e.target.value);
    };




// ----------------------------------
    const AddLift = async (event) => {
        event.preventDefault();
        try {
          await addDoc(collection(store, date), {
            origin: origin,
            destination: destination,
            date: date,
            note: note || ' ',
            time: time,
            uid: uid
          });
          navigate('/Home');
        } catch (error) {
          console.log(error);
        }
      };

// ----------------------------------


    return (
    <div>
        <Nav/>
        <Sidebar/>

        <h1 className='headerAdd'>Add New Lift</h1>

        <form id='addForm' onSubmit={AddLift}>
        <ul>  
            <li>
                <label type='text'>Origin</label>
                    <Select id="seLect"  options={City} onChange={handleOriginChange} required />
                <label type='text'>Destination</label>
                    <Select id="seLect"  options={City} onChange={handleDestinatioChange} required />
            </li>

        <li>
            <label type='text'>Date:</label>   
            <br/>
            <input type="date" required onChange={handlesetDateChange}/>
        </li>
        
        <li>
            <label type='text'>Time:</label>
            <Select id="seLect"  options={houre} onChange={handlesetTimeChange } required />
        </li>
        
        <li>
            <label type='text'>Note:</label>
            <br/>
            <textarea id='' placeholder="Type here..." onChange={handlesetNoteChange} required/>
        </li>
        <button type="submit" className="send">Send</button>
        </ul>
        </form>





    </div>
  )
}
