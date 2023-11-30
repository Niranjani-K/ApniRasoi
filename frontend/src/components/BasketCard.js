import React, {useState} from 'react';
import { Pressable } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BasketCard = ({recipe}) => {

    const navigation = useNavigation();
    var title = recipe.title.replace('Recipe','');
  
    const onSelectFoodItem = () => {
        navigation.navigate('MenuDishDetails',{
           details: recipe
          });
    }
    return(
        <Pressable onPress = {() => navigation.navigate('MenuDishDetails',{
            details: recipe
           })} key={recipe._id}>
            <View style={styles.root}>
                <Image source={{
                uri: recipe.image,
                }} style = {styles.img} />
                <Text style={styles.label}>{recipe.title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    root : {
        width: "100%",
        justifyrecipe: 'center',
        marginTop: 5,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white'
    },
    img: {
        width: 80,
        height: 80,
        marginRight: 10
    
    },
    label: {
        color: 'black',
        fontSize: 15,
        flex:1,
        verticalAlign:'top'
    }
})
export default BasketCard;
