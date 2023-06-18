import React from 'react'
import { Link , Outlet} from 'react-router-dom';
import '../Components/CSS/Sidebar.css'

export default function Sidebar() {
  return (
    <div className='continer-Side-Bar'>
       <div id='bar'>
        <ul>
            <li> <Link to='/'> Add a Lift</Link></li>
            <li> <Link to='/singup'> Details</Link></li>
            <li> <Link to='/login'>Settings</Link></li>
        </ul>
        </div>

    </div>
  )
}
