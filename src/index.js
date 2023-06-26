import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//BrowserRouter 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Screens
import Home from './Screens/Home';
import Singup from './Screens/Singup';
import Login from './Screens/Login';
import About from './Screens/About';
import Add from './Screens/Add';
import Details from './Screens/Details';
import Search from './Screens/Search';
import EditDetails from './Screens/EditDetails';
import Accounts from './Screens/Accounts';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/singup' element={<Singup/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/search' element={<Search/>}/>

      <Route path='/Add' element={<Add/>}/> 
      <Route path='/Details' element={<Details/>}/> 
        <Route path='/Details/EditDetails' element={<EditDetails/>}/> 
      
      <Route path='/Accounts' element={<Accounts/>}/> 

      <Route path='settings' element={{}}/> 

      <Route path='*' element={<h3> 404 - PAGE NOT FOUND</h3>}/>
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
