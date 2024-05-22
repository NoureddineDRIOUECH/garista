import CardProfile from './components/CardProfile'
import ChangePassword from './components/ChangePassword'
import Profileform from './components/Profile'
import React from 'react'
import Header from '../pages/header';
import { useState } from 'react';
import { useEffect } from 'react';
const Profile = () => {
  const [userDat, setUserDat] = useState([])
  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem('userSession');
      if (userData) {
        // User data found, do something with it
        console.log('User data:', JSON.parse(userData));
        setUserDat(JSON.parse(userData))
      } else {
        // No user data found
        console.log('No user data found');
      }
    };
  
    getUserData();
  }, []);
  return (
    <>

<div className='grid grid__content__Profile gap-4'>
        <CardProfile data={userDat}/>
        <Profileform/>
        <ChangePassword/>
    </div>
    </>

  )
}

export default Profile
