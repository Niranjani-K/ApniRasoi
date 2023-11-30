import React, {useState,useEffect} from 'react';
import {
  SafeAreaView ,
  StyleSheet,
  Text,
} from 'react-native';
import { Image } from 'react-native-elements';
import OrderPlacedImg from "../../assets/images/orderplaced.png";
import { useNavigation } from '@react-navigation/native';



const OrderPlacedScreen = () => {

    const navigation = useNavigation();

    useEffect(()=> {
        setTimeout(()=> navigation.navigate('Home'), 100)
    },[])

    return(
        <SafeAreaView style={styles.root}>
            <Image source={OrderPlacedImg} style={styles.logo} />
            <Text style = {styles.title}>Order Placed</Text>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    root : {
        alignItems: 'center',
         flex: 1,
        justifyContent: 'center'
    },
    logo: {
        width: '70%',
        maxWidth: 400,
        height: 180,
        maxHeight: 400
    },
    title: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30
    }
})
export default OrderPlacedScreen;