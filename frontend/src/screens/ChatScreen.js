import React, {useCallback,useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
 SafeAreaView,
  View,
  Alert,
  Pressable,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import logo from "../../assets/images/home_background.jpg";
import { useLogin } from '../context/LoginProvider';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const BOT = {
    _id: 2,
    name: 'Apni Rasoi',
    avatar: logo

}
const ChatScreen = () =>{
    const [messages, setMessages] = useState([])
    const navigation = useNavigation();
    
    const {profile} = useLogin();
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, Welcome to our Chatbot',
        createdAt: new Date(),
        user: BOT,
      }
    ])
  }, [])

  const sendRequest = async(messages) => {
  
    try {
        const response = await axios.post('http://192.168.43.16:5000/api/data', 
          {message: messages[0].text,_id:messages[0].user._id});
        
       sendMessageFromBot(response.data);

      } catch (error) {
        console.error('Error sending data:', error);
        sendErrorMessage();
      }
  }
  const sendErrorMessage = () => {
    let msg =  {
        _id: uuid.v4(),
        text: 'Unfortunately, I am unable to process your request.Try again later',
        createdAt: new Date(),
        user: BOT,
      }
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages,  [msg]),
      )
  }

  const sendMessageFromBot = (response) => {
    console.log(response);
    if(response.hasOwnProperty('error')){
        let msg =  {
            _id: uuid.v4(),
            text: "Sorry, could not understand your request",
            createdAt: new Date(),
            user: BOT,
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages,  [msg]),
          )
    }
    else if(response.hasOwnProperty('items')){
        const ingredient = response.items[0];
        let msg =  {
            _id: uuid.v4(),
            text: <Text>The ingredient {ingredient.name} has {ingredient.calories} calories with {ingredient.protein_g} proteins, {ingredient.carbohydrates_total_g} carbohydrates and {ingredient.fat_total_g} fats in g</Text>,
            createdAt: new Date(),
            user: BOT,
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages,  [msg]),
        )
    }
    else if(response[0].hasOwnProperty('instruction')){
        response.forEach((item,index)=>{
            let msg =  {
                _id: uuid.v4(),
                text: <Text onPress={() => { navigation.navigate('MenuDishDetails',{
                    details: item
                   })}} style={{ color: '#FFC800' }}>{item.title}</Text>,
                createdAt: new Date(),
                user: BOT,
            }
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages,  [msg]),
              )
        })
    }
    else {
        response.forEach((item,index) => {
            let status = "Order Placed"
            if(item.status === 1){
                status = "Preparing Dish"
            }else if(item.status ===2){
                status = "Out for delivery"
            }
            let msg =  {
                _id: uuid.v4(),
                text: <Text onPress={() => { navigation.navigate('OrderStatusScreen',{
                    orderDetails: item
                   })}} style={{ color: '#FFC800' }}>Order  {index+1} : {status}</Text>,
                createdAt: new Date(),
                user: BOT,
            }
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [msg]),
              )
        })
    }
  }
  const onSend = useCallback((messages = []) => {
    messages[0]._id = uuid.v4();
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )

    sendRequest(messages);

  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: profile._id,
      }}
    />
  )
}
    

export default ChatScreen;
