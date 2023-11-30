import React, {useState} from 'react';
import {
  SafeAreaView ,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = (props) => {
    const navigation = useNavigation();
    const onMenuOrder = () =>{
        navigation.navigate("Menu")
    }

    const onCreateOrder = () =>{

    }
    return(
        <SafeAreaView>
            <ImageBackground 
                 resizeMode='cover' 
                 source={require('../../assets/images/home_background.jpg')}
                 style={styles.image} imageStyle= 
                 {{opacity:0.8}}>
                <View style={styles.root}>
                <Text style= {styles.title}>
                    Order Your Very Own Delicious Food
                </Text>
                <CustomButton text='Order From Menu' onPress={onMenuOrder}/>

                <CustomButton text='Create Order' onPress={onCreateOrder}/>
                </View>
                </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root : {
        alignItems: 'center',
         flex: 1,
        justifyContent: 'center'
    },
    image : {
        height: "100%",
        width: "100%",
        position: 'relative', 
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50,
        marginBottom: 30
    }
})
export default HomeScreen;


