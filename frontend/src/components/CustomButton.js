import React from 'react';
import {Pressable, Text,StyleSheet} from 'react-native';



const CustomButton = (props) => {
    let color = "#FFC800";
    if(props.selected){
        if(props.selected != 1 && props.text=="All Recipes"){
            color = '#feff46'
        }
        if(props.selected != 2 && props.text=="Custom Recipes"){
            color = '#feff46'
        }
    }
    return(
        <Pressable onPress = {props.onPress} style={[styles.container, {backgroundColor: color}]}>
           <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container :{

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