import React, { useEffect, useState } from 'react'
import ProfileBoilerplate from '../components/ProfileBoilerplate'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../components/Loader';

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchProfile = async()=>{
    await axios.get(`http://192.168.1.111:3003/api/user/${params.id}`).then((res)=>{
        setUser(res.data.user)
        setIsLoading(false);
    })
  }
  useEffect(()=>{
      fetchProfile();
  })
  return (
    isLoading ? <Loader/> : 
      <ProfileBoilerplate profile={user} admin={false}/>
  )
}

export default Profile