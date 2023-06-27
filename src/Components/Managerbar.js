import React from 'react'
import { Link } from 'react-router-dom';
import '../Components/CSS/Managerbar.css'

export default function Managerbar() {
  
  return (
    <div className='continerManager'>
       <h3 className='Manager-Head'>Manager</h3>
       <div id='Managerbar'>
        <ul>
            <li> <Link to='/Lifts'> Lifts</Link></li>
            <li> <Link to='/Accounts'> Accounts</Link></li>
        </ul>
        </div>

    </div>
  )
}
