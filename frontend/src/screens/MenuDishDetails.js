import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert
} from 'react-native';
import CustomButton from "../components/CustomButton";
import { ScrollView } from 'react-native-gesture-handler';
import Ingredient from '../components/Ingredient';
import client from '../../api/client';
import { useLogin } from '../context/LoginProvider';

export default function MenuDishDetails ({route,navigation}){

    const { details} = route.params;
    const [ingredients, setIngredients] = useState([]);
    const {AddToCart,isAdmin} = useLogin();

   

    const addToBasket = () => {
        AddToCart(details);
        Alert.alert(
            'Added to basket'
        );
    }
    
    const  getIngredients = async() =>{
        const res = await client.post('/ingredients',{ingredient_ids: details.ingredients});
        setIngredients(res.data);
    }
    useEffect(()=>{
        
        getIngredients();
    },[route.params])

    return(
        
        <ScrollView  showsVerticalScrollIndicator={false} key ={details._id}>
            <View style= {styles.root}>
            {details.image ? (
             <Image source={{
                uri: details.image,
              }} style={styles.img}/> )
            : (<Text></Text>)
            }<Text style={styles.title}> {details.title} </Text>
            {/* <Text>  Category </Text> */}
            
            <Text style={styles.label}> Ingredients </Text>
      
            {
            ingredients.length==0?(
                <Text>Please wait, while it loads</Text>
            ): (
                ingredients.map(ingredient => {
                    return (<Ingredient name={ingredient.name} />)
                })
            )
            }

            <Text style={styles.label}> Recipe </Text>
    

            <Text style={{color:'black'}}> {details.instruction} </Text>
            
            {
                isAdmin == true? (
                    <Text></Text>
                ):
                (
                    <View style={{alignItems:"center"}}>
                        <CustomButton text="Add to Basket" onPress={addToBasket} />
                    </View>
                )
            }
            </View>
        </ScrollView>
      
    
    );
}

const styles = StyleSheet.create({
    root : {
        flex: 1,
        padding: 20
    },
    img: {
        width: '100%',
        height: 200,
        maxHeight: 400
    },
    label: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5
    },
    title: {
      color: '#FFC800',
      fontWeight: 'bold',
      fontSize: 30,
    }
})
