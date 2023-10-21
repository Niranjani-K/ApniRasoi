import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DrawerNavigator from "./DrawerNavigator";
import {useLogin} from "../context/LoginProvider";
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (

    <Stack.Navigator screenOptions={{headerShown: false}}>
        < Stack.Screen name="Login" component={LoginScreen} />
        < Stack.Screen name="Register" component={SignUpScreen} />
        < Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>

  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <AuthStack />;
};
export default MainNavigator;