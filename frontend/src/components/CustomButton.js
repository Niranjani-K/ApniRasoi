import React from 'react';
import {Pressable, Text,StyleSheet,} from 'react-native';

const CustomButton = (props) => {

    return(
        <Pressable onPress = {props.onPress} style={styles.container}>
           <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container :{
        backgroundColor: '#FFC800',
        width: '75%',
        height: 50,
        padding: 15,
        marginVertical: 10,

        alignItems:'center',
        borderRadius: 20,
    },

    text : {
        fontWeight: 'bold',
        color: 'white',
    },
})

export default CustomButton;