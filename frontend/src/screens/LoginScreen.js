import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
  SafeAreaView
} from 'react-native';
import logo from "../../assets/images/chefcap_black.png";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import client from "../../api/client";
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
   
    const {height} = useWindowDimensions();

    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState({
      email: '',
      password: '',
    });

    const { fetchUser,setIsLoggedIn } = useLogin();

    const [error, setError] = useState('');

  
    const { email, password } = userInfo;
  
    const handleOnChangeText = (value, fieldName) => {
      setUserInfo({ ...userInfo, [fieldName]: value });
    };

    const registerNavigate = () =>{
      navigation.navigate('Register');
    }

    const onLoginPress = async () => {
      
      try {
        const res = await client.post('/login', {...userInfo})
        
        if (res.data.success) {
          setUserInfo({ email: '', password: '' });
          await AsyncStorage.setItem('token',res.data.token);
          setIsLoggedIn(true);
          fetchUser();
        }else{
          setError(res.data.message);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <SafeAreaView  style={styles.root}>
        <Image source = {logo} style = {[styles.logo , {height:height*0.3}]} resizeMode="contain" />
        <Text style={styles.title}> APNI RASOI</Text>

        {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}

        <CustomInput label="Username" placeholder="Enter your email" value = {email} setValue={value => handleOnChangeText(value, 'email')} />
        <CustomInput label="Password" placeholder="Enter your password" value = {password} setValue={value => handleOnChangeText(value, 'password')} setSecureTextEntry = {true}/>
        <CustomButton text='Login' onPress={onLoginPress}/>

        <Text>Don't Have an account?  <Pressable onPress = {registerNavigate}><Text style={styles.link}>Create one</Text></Pressable></Text>
    </SafeAreaView  >
  );
};

const styles = StyleSheet.create({
    root : {
        alignItems: 'center',
         flex: 1,
        justifyContent: 'center'
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        height: 100,
        maxHeight: 400
    },
    link: {
      fontWeight: 'bold'
    },
    title: {
      color: '#FFC800',
      fontWeight: 'bold',
      fontSize: 30
    }
})

export default LoginScreen;