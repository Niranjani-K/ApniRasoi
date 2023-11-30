import React, { createContext, useContext, useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../../api/client';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [cartItems,setCartItem] = useState([]);
  const [isAdmin, setIsAdmin]  = useState(false);
  
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
          if(profile.email == "iit2020504@iiita.ac.in"){
            setIsAdmin(true);
          }
          setIsLoggedIn(true);
        }
        
    }else{
        setIsLoggedIn(false);
        setProfile({});
    }
}

const Logout = async() => {
  await AsyncStorage.removeItem('token');
  setIsAdmin(false);
  setIsLoggedIn(false);
  
}
  AddToCart = (item) => {
    let found = cartItems.filter(el => el._id === item._id);
    if (found.length == 0) {
         setCartItem(cartItems => {
        return [...cartItems, item];
      });
      
    } else {
      // this.setState(prevState => {
      //   const other_items = prevState.cart_items.filter(
      //     el => el._id !== item._id,
      //   );
      //   return {
      //     cart_items: [...other_items, {...found[0], qty: found[0].qty + qty}],
      //   };
      // });
    }
  };


useEffect (()=> {
  fetchUser();
}, [setIsLoggedIn]);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, isAdmin, setIsLoggedIn, profile, setProfile, fetchUser, Logout, cartItems,AddToCart }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);




export default LoginProvider;