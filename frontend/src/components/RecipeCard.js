import React, {useState} from 'react';
import { Pressable } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = ({content}) => {

    const navigation = useNavigation();
    var title = content.title.replace('Recipe','');
  
    const onSelectFoodItem = () => {
        navigation.navigate('MenuDishDetails',{
           details: content
          });
    }
    return(
          <ImageBackground
            source={{
              uri: content.image,
            }}
            style={styles.card}
            key={content._id}
            >
            <Pressable onPress= {onSelectFoodItem} style={styles.content}>
                <Text  style={styles.title}>
                       {title}
                </Text>
            </Pressable>
          </ImageBackground>
    )
}

const styles = StyleSheet.create({
    title: { 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    card: { 
        width: 190 ,
        height: 180,
        justifyContent: 'flex-end',
        paddingBottom: 4,
        marginBottom: 5,
        
    },
    content: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'flex-start',
        
    }
})
export default RecipeCard;
