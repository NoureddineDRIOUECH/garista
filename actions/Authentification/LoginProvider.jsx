// 1. Create a LoginContext.js file for your context
import React, { createContext, useState, useContext } from 'react';
import { APIURL } from '../../lib/ApiKey';
import axios from 'axios';
import { axiosInstance } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState([]);
  const [isStill, setIsStille] = useState('non');
  const [users, setUsers] = useState([])
  // const navigate = useNavigate();
  // useEffect(() => {


  //   localStorage.setItem('dataKey', users);
  // }, [users]);
  
  const login = async (email, password, navigate) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Fetch CSRF token from meta tag
      const response = await axiosInstance.post(`${APIURL}/api/auth/login`, {
        login: email,
        password,
      }, {
        headers: {
          'X-CSRF-TOKEN': csrfToken // Include CSRF token in the request headers
        }
      });
  
      if (response.status === 200) {
        setIsLoggedIn(true);
        // console.log("The Response => ", response.data.user);
        setUserData(response.data.user)
        // navigate("/Dashboard");
      } else {
        setIsLoggedIn(false);
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMsg("Email or password are incorrect")
      setIsLoggedIn(false);
    }
  };

  const logout =async ({navigate, token}) => {
    try {
      console.log("The Token => ", token);
      const response = await axiosInstance.post(`/api/auth/logout`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        console.log("The Response of Logout => ", response.data);
        navigate('/Login')
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout, ErrorMsg, isStill, userData }}>
      {children}
    </LoginContext.Provider>
  );
};
