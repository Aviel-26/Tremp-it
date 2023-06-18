import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//BrowserRouter 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Screens
import Home from './Screens/Home';
import Nav from './Components/Nav';
import Singup from './Screens/Singup';
import Login from './Screens/Login';
import Sidebar from './Components/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/singup' element={<Singup/>}/>
      <Route path='/login' element={<Login/>}>
        <Route path='/login/singup' element={<Singup/>}/>
      </Route>
      <Route path='/myrides' element={{}}/> {/* my rides components */}
      <Route path='/newride' element={{}}/> {/* presonal ditals compepnt  */}
      <Route path='settings' element={{}}/> {/* Settings compepnets */}

      <Route path='*' element={<h3> 404 - PAGE NOT FOUND</h3>}/>
       {/* <Route path='*' element={<h3 className='text-center alert alert-danger'></h3> */}
    </Routes>
  
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
