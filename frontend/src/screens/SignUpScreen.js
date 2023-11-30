import React, {useState} from 'react';
import {
  SafeAreaView ,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';
import client from '../../api/client';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    DOB: new Date(),
  });
  const [error, setError] = useState('');

  const [showPicker,setShowPicker] = useState(false);
  const [dummy, setDummyDOB] = useState(new Date());

  const {fetchUser} = useLogin();

  const { fullName, email, password, contact,DOB} = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };


    const dummyDOB = ()=>{
      setDummyDOB(DOB);
    }

    const {height} = useWindowDimensions();

    const onSubmit = async() => {
      try {
        const res = await client.post('/register', { ...userInfo });
        if (res.data.success) {
            const loginRes = await client.post('/login', {email:userInfo.email,password:userInfo.password});
            if (loginRes.data.success) {
              await AsyncStorage.setItem('token',loginRes.data.token);
              setIsLoggedIn(true);
              fetchUser();
            }
            else{
              console.log(error);
            }
          setUserInfo({
            name: '',
            email: '',
            password: '',
            contact: '',
            DOB: new Date(),
          });
        }
        console.log(res.data);
      } catch (error) {
        setError(error);
      }
    }

    const loginNavigate = () =>{
      navigation.navigate('Login');
    }

    const toggleDOBPicker = () =>{
      setShowPicker(!showPicker);
    }

    const onDOBChange = ({type}, selectedDOB) => {
      if(type == 'set'){
        const currentDOB = selectedDOB;
        handleOnChangeText(currentDOB,'DOB')
        setShowPicker(false);
      }else{
        toggleDOBPicker();
      }
    }

  return (
    <SafeAreaView  style={styles.root}>
        <Text style = {styles.heading}>Create your account</Text>

        {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}

        <CustomInput label="Full Name" placeholder = "Enter your full name" value = {fullName} setValue={value => handleOnChangeText(value, 'name')} />
        <CustomInput label="Email" placeholder = "Enter your email" value = {email} setValue={value => handleOnChangeText(value, 'email')} />
        <CustomInput label="Contact"  placeholder = "Enter your phone number" value = {contact} setValue={value => handleOnChangeText(value, 'contact')}  />
        <CustomInput label="Password"  placeholder = "Enter your password" value = {password} setValue={value => handleOnChangeText(value, 'password')} setSecureTextEntry = {true}/>
        
        <Pressable onPress = {toggleDOBPicker} style={{width:'100%'}}>
        <CustomInput label="Date of Birth" value={DOB.toLocaleDateString()} setValue={setDummyDOB}/>
         
          </Pressable>

          {showPicker && 
           <DateTimePicker
           mode="date"
           display='spinner'
           value={DOB}
           onChange={onDOBChange}
           />
          }
        
        <CustomButton text='Register' onPress={onSubmit}/>

        <Text >Already have an account?  <Pressable onPress = {loginNavigate}><Text style={styles.link}>Login</Text></Pressable></Text>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
    root : {
        alignItems: 'center',
        //padding: 30,
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
      fontWeight: 'bold',
      color: '#FFC800',
      fontSize: 30,
      marginBottom: 20
    },

    link: {
      fontWeight: 'bold'
    }
})

export default SignUpScreen;