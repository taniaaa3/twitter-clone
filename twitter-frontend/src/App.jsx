import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './context/useAuth';
import Home from './pages/Home';
import Pagenotfound from './pages/404';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Sidebar from './components/Sidebar';
import TweetRedirect from './pages/TweetRedirect';
import User from './pages/User';


const App = () => {
  const {token} = useAuth();
  return (
    <div className='w-screen h-screen m-0 bg-gray-200 flex justify-center items-center flex-col sm:flex-row'>
    <BrowserRouter>
      <ToastContainer theme="dark"/>
      {token? 
      <Sidebar/> : ""}
    <Routes>
      {!token ? 
      <>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/*" element={<Login/>}/>
      </>
      : 
      <>
      <Route path='/' element={<Home/>}/>
      <Route path='/tweet/:id' element={<TweetRedirect/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path="/*" element={<Pagenotfound/>}/>
      </>
      }
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
