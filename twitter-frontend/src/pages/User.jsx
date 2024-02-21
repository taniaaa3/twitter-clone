import React, { useState } from 'react'
import { useAuth } from '../context/useAuth';
import ProfileBoilerplate from '../components/ProfileBoilerplate';

const User = () => {
    const {user} = useAuth();
  return (
      <ProfileBoilerplate profile={user} admin={true}/>
  )
}

export default User