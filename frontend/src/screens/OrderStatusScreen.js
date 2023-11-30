import React, {useState,useEffect} from 'react';
import StepIndicator from 'react-native-step-indicator';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  Button
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import client from '../../api/client';
import CustomButton from '../components/CustomButton';
import { useLogin } from '../context/LoginProvider';
import OrderStatusCard from '../components/OrderStatusCard';

const OrderStatusScreen = ({route,navigation}) => {
    const {recipe} = route.params;
    const {orderDetails} = route.params;

    
    const [order,setOrder] = useState([]);

    const getOrder = async() => {  
        
        const res = await client.post('/order',{orderId: orderDetails._id});
        setOrder(res.data);
    }

    const onRateDish = async(rating) => {
        console.log("here" + rating);
        const ratedDish = await client.post('/rate', {orderId: order[0]._id, rating: rating});
        getOrder();
    }
 
     const statusChange = async() => {
         const status = order[0].status+1;
         const res = await client.post('/status', {orderId: order[0]._id, status: status});
         getOrder();
    }
    const labels = ["Order Placed" , "Dish Prepared", "Delivered"];

    useEffect (()=> {
        getOrder();
      }, [orderDetails]);
  
    return(
        <View  style= {{flex: 1}}>
       {
                order.length != 1 ?  (
                    <Text>Please wait while it loads</Text>
                ) : (
                
                    <View  style={styles.root} >
                    {recipe.image ? (
                        <Image source={{
                            uri: recipe.image,
                        }} style={styles.img}/> )
                        : (<Text></Text>)
                        }
                        
                        <Text style={styles.title}> {recipe.title} </Text>
                        {/* <Text style={styles.subheading}> {date} </Text> */}
                        
                        <Pressable onPress = {()=> navigation.navigate('MenuDishDetails',{
                            details: recipe
                        })} style = {styles.subcontainer}>
                            <Text style = {styles.dish}>View Dish Details</Text>
                        </Pressable>
            
                        <StepIndicator
                            customStyles={styles.customStyles}
                            currentPosition={order[0].status}
                            labels={labels}
                            stepCount={3}
                            direction="vertical"
                        />
                        

                        <OrderStatusCard order={order[0]} onRateDish={onRateDish} statusChange={statusChange}  />
                </View>
                )
                }
                 
            </View>
         )
   
    };

const styles = StyleSheet.create({
    root : {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: 200,
        maxHeight: 400
    },
    title: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 25,
      textAlign: 'left'
    },
    subheading: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 18,
    },
    dish: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    subcontainer: {
        margin: 10,
        backgroundColor: '#FFC800',
        height: 30,
        width: '100%',
        alignItems: 'center'
    },
    customStyles: {
        stepIndicatorFinishedColor: '#FFC800',
        stepIndicatorUnFinishedColor: 'white',
        stepIndicatorCurrentColor: 'white',
        stepStrokeFinishedColor: '#FFC800',
        stepStrokeUnFinishedColor: 'white',
        labelColor: 'black',
        labelSize: 13,
    },
    rating:{
        flexDirection: 'row',
        width: '100%',
        marginBottom: 30,
        marginLeft: 30
        
    },
    button:{
        backgroundColor: '#FFC800',
        width: '30%',
        height: 35,
        padding: 1,
        alignItems:'center',
        borderRadius: 10,
    }

})

export default OrderStatusScreen;