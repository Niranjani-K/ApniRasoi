import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../api/client';

export default function PastOrderCard({order,key}){
     
    const [recipe,setRecipe] = useState([]);
    const [date,setDate] = useState();
    
    let title = recipe.title;
    if(title != undefined){
        title = title.substring(0,20)+'...'
    }
    

    const getRecipe = async() => {
        const res = await client.post('/recipe',{recipeId: order.recipe});
        setRecipe(res.data);
       
    }

    const formatDate = () => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        setDate(new Date(order.timestamp).toLocaleDateString(undefined, options));
      }

   useEffect(()=>{
    getRecipe();
    formatDate();
   }, [order]);
    
    const navigation = useNavigation();
    return(
        <Pressable style={styles.root} onPress={() => navigation.navigate('OrderStatus',{
            recipe: recipe,
            orderDetails: order
           })} key={key}>
        <View style={{flexDirection:'row'}}>
          <Text style= {styles.title} >{title}</Text>
          <Text style={styles.label}>Placed at: {'\n'} <Text style={styles.date}> {date} </Text></Text>
        </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    root : {
        width: "100%",
        justifyContent: 'center',
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        height: 60,
        padding: 10
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    label: {
        color: '#A9A9A9',
        fontWeight: 'bold',
        fontSize: 14,
        flex:1,
        textAlign:'right', 
        verticalAlign:'bottom'
    },
    date: {
        fontWeight: 'bold',
        color: '#FFC800'
    }
})