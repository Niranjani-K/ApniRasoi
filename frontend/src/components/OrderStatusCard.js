import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../api/client';
import CustomButton from '../components/CustomButton';
import StarRating from 'react-native-star-rating-widget';
import StepIndicator from 'react-native-step-indicator';
import { useLogin } from '../context/LoginProvider';

export default function OrderStatusCard({order,onRateDish,statusChange}){
    
    const [rating,setRating] = useState(order.rating);

   
    const { isAdmin } = useLogin();


    const labels = ["Order Placed" , "Dish Prepared", "Delivered"];
    
    const navigation = useNavigation();

    const rateDish = () =>{
        onRateDish(rating);
    }

    return(
    <View>
            
        {
            isAdmin == true ? (

                order.status <= 2 ? (
                    
                    <View style= {{alignItems: 'center',marginBottom: 30}}>
                
                <CustomButton text="Update Status" onPress={statusChange} />
                </View>
                ): (
                    order.rating != 0 ? (
                        <View style= {{alignItems: 'center',marginBottom: 30}}>
                        <StarRating
                                rating={order.rating}
                                onChange={() => {}}
                        />
                        
                        </View>
                    ):(<Text></Text>)
                )
            ):(
                order.status <= 2? (
                    <Text> </Text>
                ) :(
                order.rating != 0? (
                    
                    <View style= {{alignItems: 'center',marginBottom: 30}}>
                    <StarRating
                            rating={order.rating}
                            onChange={() => {}}
                    />
                    </View>
                    ):
                    <View style= {styles.rating}>
                            <StarRating
                            rating={rating}
                            onChange={setRating}
                        />
                        
                        <Pressable onPress = {rateDish} style={styles.button}>
                            <Text style={styles.dish}>Rate</Text>
                        </Pressable>
                </View>
                
                ))
            }
    
            </View>
    )
}

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