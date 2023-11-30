import React, {useState,useEffect} from 'react';
import {
  ScrollView ,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import RecipeCard from '../components/RecipeCard';
import MasonryList from '@react-native-seoul/masonry-list';
import client from '../../api/client';
import { MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import CustomInput from '../components/CustomInput';


const MenuScreen = () =>{
  const [recipes,setRecipies] = useState([]);
  const [search,setSearch] = useState();
  const [defaultRecipes, setdefaultRecipes] = useState([]);

  const  getAllRecipes = async() =>{
    const res = await client.get('/getRecipes');

      setRecipies(res.data);
      setdefaultRecipes(res.data);
  }


  useEffect(()=>{
    getAllRecipes();
},[])

  const updateSearch = (search) => {
   

    if(search) {
    const updatedData = recipes.filter((recipe) => { 
     if(recipe.title != undefined)
      return recipe.title.toUpperCase().includes(search.toUpperCase())
    }); 
      setRecipies(updatedData);
      setSearch(search);
    }else{
      setRecipies(defaultRecipes);
        setSearch(search);
      
    }
  }
  
    return(
        <ScrollView   style = {styles.root}>
        <Text style={styles.title}>Dishes Available</Text>
        {/* <View style={{flexDirection: "row",alignItems: "center"}}> */}
        <View >
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(value) => updateSearch(value)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="Search Here"
            />
          </View>
            {/* <MagnifyingGlassIcon size={40} strokeWidth={3} color="#FFC800" /> */}



        {
            recipes.length==0?(
                <Text>Please wait, while it loads</Text>
            ): (
                <MasonryList
                    data={recipes}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <RecipeCard content={item} />}
                />
            )
        }
        </ScrollView>
    );
}



const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    marginRight: 10,
  },
  title: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  root:{
     padding: 5
  },
   textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  }

})
export default MenuScreen;