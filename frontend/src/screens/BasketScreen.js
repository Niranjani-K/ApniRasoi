import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
 ScrollView,
  View,
  Alert
} from 'react-native';
import BasketCard from '../components/BasketCard';
import CustomButton from '../components/CustomButton';
import { useLogin } from '../context/LoginProvider';
import MasonryList from '@react-native-seoul/masonry-list';
import client from '../../api/client';
import { useNavigation } from '@react-navigation/native';

const BasketScreen = () =>{

    const { profile,cartItems } = useLogin();
    const navigation = useNavigation();

    const orderPlaced = () => {
        Alert.alert(
            '',
            'Do you want to confirm your order',  
            [
               {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
               {text: 'Confirm', onPress: () => {
                ConfirmOrder();
               }},
            ],
            { cancelable: false }
       )
    }

    const ConfirmOrder = async()=>{
        cartItems.map((cartItem) => {
            const orderPlace = client.post('/orderplace',{recipeId: cartItem._id, userId: profile._id })
        })
        navigation.navigate("OrderPlaced")
    }

    return(
       <View  style={{flex: 1}}>
        {
            cartItems.length==0?(
                <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{color: '#FFC800', fontSize: 30}}>Basket is empty</Text>
                </View>
            ): (
               <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                <MasonryList
                        data={cartItems}
                        keyExtractor={(item) => item._id}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <BasketCard recipe={item} />}
                />
                </ScrollView>
            )
        }
        <View style = {{alignItems: 'center'}}>
            <CustomButton text='Order Now' onPress = {orderPlaced}/>
        </View>
         
        </View>
        
    );
    

}



export default BasketScreen;