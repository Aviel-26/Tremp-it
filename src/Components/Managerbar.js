import React from 'react'
import { Link } from 'react-router-dom';
import '../Components/CSS/Managerbar.css'

export default function Managerbar() {
  
  return (
    <div className='continerManager'>
       <div id='Managerbar'>
        <ul>
            <li> <Link to='/Lifts'> lifts</Link></li>
            <li> <Link to='/Accounts'> Accounts</Link></li>

        </ul>
        </div>

    </div>
  )
}
