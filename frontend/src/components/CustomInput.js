import React from 'react';
import {SafeAreaView, TextInput,StyleSheet,Text} from 'react-native';

const CustomInput = (props) => {

    let setSecureTextEntry = false;
    if(props.setSecureTextEntry) setSecureTextEntry = true;
    
    return(
        <SafeAreaView style={styles.input}>
            <Text>{props.label}</Text>
        
        <SafeAreaView style={styles.container}>
            
            <TextInput 
            style = {styles.input} 
            value = {props.value}
            onChangeText={props.setValue}
            placeholder= {props.placeholder} 
            secureTextEntry={setSecureTextEntry}/>
        </SafeAreaView>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container :{
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        borderColor: 'E8E8E8',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 10
    },

    input : {
        width: '100%'
    },
})

export default CustomInput;