import React from "react";
import { StyleSheet, Text, Dimensions, View, Pressable } from 'react-native'

const ListIngredient = (props) => {

    const deleteIngredient = () => {
        props.deleteItem(props.ids)
    }

    return (
      <View style={styles.viewStyleSheet}>
        <Text style={styles.textStyles}>{props.name}</Text>
        <Pressable onPress={deleteIngredient} >
        <Text style={styles.cancelStyle}>X</Text>
        </Pressable>
      </View>
  
    )
}

const styles = StyleSheet.create({
    textStyles: {
            fontStyle: 'italic',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#FFC800',
            textAlign: 'left',
            flex: 1
    },
    viewStyleSheet: {
            flexDirection: 'row',
            marginTop: 5,
            marginLeft: 10,
            borderRadius: 10,
            padding: 3,
            width: "90%",
            backgroundColor: "white"
    },
    cancelStyle : {
       color: '#FFC800',
       fontSize: 25,
       textAlign: 'right',
      
    }
})
export default ListIngredient;