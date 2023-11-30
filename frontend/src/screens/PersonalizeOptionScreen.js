import { Text, SafeAreaView,ScrollView, StyleSheet,View} from 'react-native';
import React, {useState,useEffect} from 'react';
import ListIngredient from "../components/ListIngredient";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import RequirementCard from '../components/RequirementCard';
import client from '../../api/client';
import { useLogin } from '../context/LoginProvider';
import { FlatList } from 'react-native-gesture-handler';

export default function PersonalizeOptionScreen() {
  
    const [ingredient,setIngredient] = useState();
    const [ingredientsList,setIngredientsList] = useState([]);
    const [ingredientPresent, setIngredientPresent] = useState(true);
    const [requirement,setRequirement] = useState({});
    const { profile,isAdmin } = useLogin();
    

    const addIngredient = async() => {
      setIngredientPresent(true);
      console.log("here");
      const res = await client.post('/allergy',{userId: profile._id, ingredient: ingredient});
      if(!res.data.success) {
        setIngredientPresent(false);
        setIngredient("");
        return;
      }
      setIngredientsList([...ingredientsList,res.data]);
      setIngredient("");
      
    }

  const deleteAllergy = async(id) => {
    console.log(id);
    
     setIngredientsList((currentGoals) => {
            return currentGoals.filter((goal) => goal._id != id)
        });
        const res = await client.post("/removeAllergy", {userId: profile._id, ingredientId: id})
        console.log(res.data);
    }

  const handleChangeRequirement = (value,fieldName) => {
    
     setRequirement({ ...requirement, [fieldName]: value }); 
     
  }

  const fetchAllergies = async() => {
    const res = await client.post("/getAllergies", {userId: profile._id});
    
    setIngredientsList(res.data);
    
  }

  const addRequirement = () => {
    console.log(requirement);
    console.log(ingredientsList);
  }

  useEffect (()=> {
   
    fetchAllergies();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, margin: '10px'}}>
            <Text  style={styles.title} >Personalize Apni Rasoi</Text>
            <View style = {{alignItems:'center', marginBottom: 20}}>
             <Text style = {styles.subHeading}> Add your Allergic Ingredients </Text>
                <CustomInput label="" placeholder=" "value = {ingredient} setValue={value => setIngredient(value)} />
               
             
              {!ingredientPresent ? (
                    <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
                        We dont have this in our kitchen
                    </Text>   

                ) : null}

        {
            ingredientsList.length==0?(
                null
            ): (
              <FlatList
                keyextractor = {item => item.id}  
                data={ingredientsList}
                renderItem={({ index, item }) => {
                    return (
                      <ListAllergicIngredient name={item.name} deleteItem={deleteAllergy} ids={item._id}  />
                    )
                }}
            />
             )
        }
          <CustomButton text='Add Ingredient' onPress={addIngredient} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 5 }}>
    
    </View>
           
          </View>
         
          

          <Text style = {styles.subHeading}> Add your Requirement </Text>
          <RequirementCard name = "Calories" handleChangeRequirement = {handleChangeRequirement} />
          <RequirementCard name = "Protiens" handleChangeRequirement = {handleChangeRequirement}  />
          <RequirementCard name = "Carbohydrates" handleChangeRequirement = {handleChangeRequirement}  />
          <RequirementCard name = "Fats" handleChangeRequirement = {handleChangeRequirement} />
          <View style= {{alignItems: 'center'}} >
          <CustomButton text='Add Requirement' onPress={addRequirement} />
           </View>
        </ScrollView>
  );
}

const styles = StyleSheet.create({

  title: {
      color: '#FFC800',
      fontWeight: 'bold',
      fontSize: 30,
      marginBottom:10
  },
  
    subHeading: {
        color: '#5a5a5a',
        fontSize: 18,
        fontWeight: 'bold',
       
    }
});
