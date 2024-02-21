import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const Sidebar = () => {
    const [navLinks, setNavLinks] = useState([{
        icon: "fa-solid fa-house",
        title: "Home",
        link: "/"
    },
    {
        icon: "fa-user",
        title: "Profile",
        link: "/user"
    },
    {
        icon: "fa-right-from-bracket",
        title: "Logout",
        link: "/logout"
    }])
    const {user, fetchUser} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        fetchUser();
    })
    return (
        <div className='bg-white sm:h-screen h-94 w-5/6 sm:w-1/5 flex justify-between flex-col items-start'>
            <div className='p-5 w-full'>
            <svg fill="blue" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            {navLinks.map((val)=>{
            return <NavLink to={val.link} className='flex flex-row items-center text-xl mt-2 p-2 rounded-full'>
                <i className={` fa-solid ${val.icon} mr-5 ml-2`}></i>
                <p>{val.title}</p>
            </NavLink>
            })}
            </div>
            <div className='flex flex-row self-center mb-2 justify-center items-center cursor-pointer' onClick={()=>{navigate('/user')}}>
                <img src={user.profilePicture ? `/profilePics/${user.profilePicture}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&usqp=CAU"} className='w-10 h-10 rounded-full m-2' alt="usericon" />
                <div className='flex flex-col'>
                    <h1>{user.name}</h1>
                    <p>@{user.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar