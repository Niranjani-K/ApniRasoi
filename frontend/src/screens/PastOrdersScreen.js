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

const PastOrdersScreen = () => {
    
    const [orders,setOrders] = useState([]);

    const { profile,isAdmin } = useLogin();

    const route = useRoute();
    
    
    const getAllOrders = async() => {
        console.log(route.name)
        if(isAdmin){
            if(route.name == "Current Orders"){
                const res = await client.get('/currorders');
                setOrders(res.data);
            }else{
                const res = await client.get('/pastorders');
                setOrders(res.data);
            }
        }else {
            const res = await client.post('/orders',{ userId: profile._id});
            console.log(res.data);
            setOrders(res.data);
        }
    }

    useEffect(()=>{
        getAllOrders();
    },[route.name])

    return(
        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <Text style={styles.title}>Orders</Text>
            {
                orders.length == 0?(
                    <Text>Please wait while it loads</Text>
                ):(
                    orders.map(order => {
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
export default PastOrdersScreen;


