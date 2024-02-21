import React, { useEffect } from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        logout();
        navigate('/');
    })
}

export default Logout