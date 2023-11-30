import React, {useState,useEffect} from 'react';
import {
  View ,
  StyleSheet,
  Text,
} from 'react-native';
import { Image } from 'react-native-elements';
import OrderPlacedImg from "../../assets/images/orderplaced.png";
import { useNavigation } from '@react-navigation/native';



const OrderPlacedScreen = () => {

    const navigation = useNavigation();

    useEffect(()=> {
        setTimeout(()=> navigation.navigate('Home'), 300)
    },[])

    return(
        <View style={styles.root}>
            <Image source={OrderPlacedImg} style={styles.logo} />
            <Text style = {styles.title}>Order Placed</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    root : {
        alignItems: 'center',
         flex: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        maxWidth: 400,
        height: 200,
        maxHeight: 400
    },
    title: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30
    }
})
export default OrderPlacedScreen;