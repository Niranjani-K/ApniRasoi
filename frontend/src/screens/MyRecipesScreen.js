import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import PastOrderCard from '../components/PastOrderCard';
import { ScrollView } from 'react-native-gesture-handler';
import client from '../../api/client';
import { useLogin } from '../context/LoginProvider';
import {getFocusedRouteNameFromRoute,useRoute} from '@react-navigation/native';

const MyRecipes = () => {
    
    const [recipes,setRecipes] = useState([]);

    const { profile,isAdmin } = useLogin();

    const getMyRecipes = async() => {
        console.log(route.name)
        const res = await client.get(`/recipes/:${profile._id}`);
        setRecipes(res.data);
    }

    useEffect(()=>{
        getMyRecipes();
    },[route.name])

    return(
        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <Text style={styles.title}>My Recipes</Text>
            {
                recipes.length == 0?(
                    <Text>Please wait while it loads</Text>
                ):(
                    recipes.map(order => {
                        return <PastOrderCard order={order} key={order._id} />
                    })
                )
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    root : {
        flex: 1,
        marginBottom:10
    },
    title: {
      color: '#FFC800',
      fontWeight: 'bold',
      fontSize: 30,
    }
})
export default MyRecipes;


