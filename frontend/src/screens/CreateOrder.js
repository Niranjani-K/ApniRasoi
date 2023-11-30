import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
 ScrollView,
  View,
  Alert,
  Button,
  Pressable,
} from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import CustomButton from '../components/CustomButton';
import { useLogin } from '../context/LoginProvider';
import client from '../../api/client';
import CustomInput from '../components/CustomInput';
import ListIngredient from "../components/ListIngredient";
import Modal from "react-native-modal";
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const CreateOrder = () => {

    const {profile} = useLogin();
    const navigation = useNavigation();
    const [title,setTitle] = useState();
    const [ingredient,setIngredient] = useState();
    const [instructions,setInstructions] = useState();
    const [ingredeintPresent, setIngredientPresent] = useState(true);
    const [ingredientsList,setIngredientsList] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [macronutrients,setMacronutrients] = useState({
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        calories: 0
    })

    const addIngredient = async() => {
        setIngredientPresent(true);
        const res = await client.post("/ingredient",{ingredient: ingredient});
        if(res.data.message){
            setIngredientPresent(false);
            return;
        }
        console.log(res.data);
        setMacronutrients((prevMacronutrients) => ({
            proteins: prevMacronutrients.proteins + res.data.protiens,
            carbohydrates: prevMacronutrients.carbohydrates + res.data.carbohydrates,
            fats: prevMacronutrients.fats + res.data.fats,
            calories: prevMacronutrients.calories + res.data.calories,
        }));

        setIngredientsList([...ingredientsList,res.data]);
        setIngredient("");
    }

    const deleteIngredient = (id) => {
        
        const removeIngredient = ingredientsList.find((ingredient) => {
            return ingredient._id === id;
          })

          setMacronutrients((prevMacronutrients) => ({
            proteins: prevMacronutrients.proteins - removeIngredient.protiens,
            carbohydrates: prevMacronutrients.carbohydrates- removeIngredient.carbohydrates,
            fats: prevMacronutrients.fats - removeIngredient.fats,
            calories: prevMacronutrients.calories - removeIngredient.calories,
        }));

        setIngredientsList((currentGoals) => {
            return currentGoals.filter((goal) => goal._id != id)
        });

    }
    const confirmOrder = () => {

    //     Alert.alert(
    //         '',
    //         'Do you want to confirm your order?',  
    //         [
    //            {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
    //            {text: 'Confirm', onPress: () => {
    //                 submitRecipe();
    //            }},
    //         ],
    //         { cancelable: false }
    //    )
    setModalVisible(true);
        return (
            <View>
            <Modal isVisible = {isModalVisible}>
                <View style={{ flex: 1 }}>
                <Text>I am the modal content!</Text>
                <Button title="Hide modal" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
            </View>
        );
    }
    const submitRecipe = async () =>{

            const ingredients = ingredientsList.map(ingredient => ingredient._id);
            
            const recipe = {
                title : title,
                user: profile._id,
                instruction: instructions,
                ingredients : ingredients,
                macronutrients: macronutrients
            }

            const res = await client.post('/createRecipe',{recipe:recipe});
            console.log(res.data._id);
            const order_res = await client.post('/orderplace',{recipeId: res.data._id,userId:profile._id});
           if(order_res.data.success){
            navigation.navigate("OrderPlaced");
           }
        
    }

    return (
        
         
        <ScrollView showsVerticalScrollIndicator={false} style = {{flex:1, margin: 10}}  >

        <Text  style={styles.title} >Add Recipe Name</Text>
        <CustomInput label="" placeholder=""value = {title} setValue={value => setTitle(value)} />
            
            <Text  style={styles.title} >Add Ingredients</Text>
            
              <View style={{flexDirection:'row'}}>
                <View style = {{alignItems: 'left',width:'70%', marginRight: 10 }}>
                <CustomInput label="" placeholder="Example: 3 tomatoes "value = {ingredient} setValue={value => setIngredient(value)} />
                </View>
                <View style = {{alignItems: 'right',width:'65%'}}>
                <Pressable onPress = {addIngredient} style={styles.container}>
                    <Text style={styles.text}>Add</Text>
                </Pressable>
                </View>
              </View>

              {!ingredeintPresent ? (
            <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
            We dont have this in our kitchen
            </Text>
        ) : null}
            

            <Text style={[styles.title , {color:"grey"}]}>Added Ingredients</Text>
            <FlatList
                        data={ingredientsList}
                        keyExtractor={(item) => item._id}
                        numColumns={1}
                        renderItem={({item}) => <ListIngredient name={item.name} deleteItem = {deleteIngredient} ids = {item._id}/>}
            />
            <Text  style={styles.title} >Add Recipe Instructions</Text> 
            <TextInput
                multiline
                style = {styles.input}
                onChangeText={(val) => setInstructions(val)}
            />
        
       
        <View style = {styles.submit} >
            <CustomButton text="Order Recipe" onPress = {confirmOrder} />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root : {
        alignItems: 'center',
         flex: 1,
        justifyContent: 'center',
       
    },
    link: {
      fontWeight: 'bold'
    },
    title: {
      color: '#FFC800',
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 10
    },
    container :{
        backgroundColor: '#FFC800',
        width: '30%',
        height: 50,
        padding: 15,
        marginVertical: 30,
        alignItems:'center',
        borderRadius: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#777",
        width: "100%",
        
        backgroundColor: "white"
       
    },
    submit : {
        alignItems: "center",
        width: "100%"
    }
   
})
export default CreateOrder;