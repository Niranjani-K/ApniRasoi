import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/AuthStack';
import axios from 'axios';
import LoginProvider from './src/context/LoginProvider';


function App() {

  const fetchApi = async () => {
    try{
      const res = await axios.get('http://192.168.43.16:3000/')
      console.log(res.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect (()=> {
    fetchApi();
  }, []);
  

  return (
    <LoginProvider>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  </LoginProvider>
  );
}


export default App;
