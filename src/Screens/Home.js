import React from 'react'
import Nav from '../Components/Nav'
import '../Components/CSS/Home.css'
import Sidebar from '../Components/Sidebar'

export default function Home() {
  return (
    <div id='continer'>
        <Sidebar/>
        <h2> Search</h2>
        <label id='select'>My location</label>
        <select ></select>
        <label id='select'>Destination</label>
        <select  placeholder='Destination'></select>
        <button type='submit' className='BTNsearch'>Search 🔎 </button>
        
      
          <h3>Name</h3>
          <h3>From</h3>
          <h3>Destination</h3>
          <h3>Hour</h3>
          <h3>comunication</h3> 

    </div>
  )
}
