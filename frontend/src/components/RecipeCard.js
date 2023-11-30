import React, {useState} from 'react';
import { Pressable } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = ({content}) => {

    const navigation = useNavigation();
    content.title = content.title.replace('Recipe','');
    title = content.title;
    if(title.length > 25){
        title = title.substring(0,25) + "...";
    }
    
   
  
    const onSelectFoodItem = () => {
        navigation.navigate('MenuDishDetails',{
           details: content
          });
    }
    return(
        //   <ImageBackground
        //     source={{
        //       uri: content.image,
        //     }}
        //     style={styles.card}
        //     key={content._id}
        //     >
        //     <Pressable onPress= {onSelectFoodItem} style={styles.content}>
        //         <Text  style={styles.title}>
        //                {content.title}
        //         </Text>
        //     </Pressable>
        //   </ImageBackground>

        <View style={styles.listContainer}>
        <View style={styles.imageContainer}>
          <Image  source={{
               uri: content.image,
             }} style={styles.image} />
        </View>
        
        <TouchableWithoutFeedback
          onPress={onSelectFoodItem} >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
          </View>
          
        </TouchableWithoutFeedback>
      </View>
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
        backgroundColor: 'rgba(255, 45, 45, 0.5)',
        alignItems: 'flex-start'
    },
    listContainer: {
        width: Dimensions.get('window').width / 2 - 20,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
      },
      imageContainer: {
        margin: 15,
        borderRadius: 10,
        overflow: 'hidden',
      },
      image: {width: '100%', height: undefined, aspectRatio: 1},
      nameText: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 15,
      },
      button: {
        backgroundColor: '#62513E',
        padding: 10,
        margin: 15,
        borderRadius: 10,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
})
export default RecipeCard;
