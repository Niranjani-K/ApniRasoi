import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

const Ingredient = (props) => {
    return(
    
        <View style={styles.root} key={props._id}>
        <View style={{flexDirection:'row'}}>
        {/* <Image
            source={{uri: props.uri}}
            //borderRadius props of style will help to make the Round Shape Image
            style={{ height: 40, width: 40, borderRadius: 200 / 2}}
            /> */}
          <Text style={[styles.label,{textAlign:'left'}]}>{props.name}</Text>
          {/* <Text style={[styles.label,{textAlign:'right'}]}>{props.quantity}</Text> */}
        </View>
        </View>
    );

}


const styles = StyleSheet.create({
    root : {
        width: "100%",
        justifyContent: 'center',
        marginTop: 5
    },
    img: {
        width: '100%',
        maxWidth: 300,
        height: 200,
        maxHeight: 400
    },
    label: {
        color: 'black',
        fontSize: 20,
        flex:1,
        verticalAlign:'middle'
    }
})

export default  Ingredient;