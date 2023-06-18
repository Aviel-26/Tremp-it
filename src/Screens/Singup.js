import React from 'react';
import '../Components/CSS/Singup.css'

export default function Singup() {
  return (
    <div>
        <h1 className='header'>Singup</h1>
        <form id='formSignup'>
           <ul>

           <li>
            <input type='text' placeholder='First Name'/>
            <input type='text' placeholder='Last Name'/>
           </li>
            
            
            <li>
              <input type='text' placeholder='Id number'/>
              <input type='text' placeholder='StudentID'/>
            </li>
            
            <li> 
             <input type="tel" id="phone" name="phone" placeholder="Phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}" required/>
             <input type="email" id="email" name="email" placeholder='Email'/>
             <input type="date" id="birthday" name="birthday" />
            </li>

            
            <li>

            <lable> Gender:</lable>
            <label>Male</label>
            <input type='radio' name='gender' id='g1'/>
            <label>Female</label>
            <input type='radio' name='gender' id='g1'/>
            
            
            <input type='file'  name="Image" accept="image/*" id='custom-file-input' />
            </li>
            
            
            <li>
           <label id='select'>City</label>
           <select placeholder='Select'></select>
           <label id='select'>Street</label>
           <select placeholder='Select'></select>
           </li>
           
            
             
            <li>
              <label>About Me:</label>
            </li>
            <li>
              <textarea placeholder='Type here...'/>
            </li>

            <button type='submit' className='send'> send</button>
            </ul>
            
            
        </form>

    </div>
  )
}
