import React, { createContext, useContext, useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../../api/client';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});

const fetchUser = async () =>{
    const token = await AsyncStorage.getItem('token');
    if(token !== null){
      const res =  await client.get(
        '/validUser',
        {
          headers:
            {
              authorization: `JWT ${token}`
            }
          }
        )
      
        if(res.data.success){
          setProfile(res.data.user);
          setIsLoggedIn(true);
        }
        
    }else{
        setIsLoggedIn(false);
        setProfile({});
    }
}


  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, fetchUser }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);


export const Logout = async() => {
  const {fetchUser} = useLogin();
  
  await AsyncStorage.removeItem('token');
  fetchUser();
}
export default LoginProvider;