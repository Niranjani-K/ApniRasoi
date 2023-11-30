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
import CustomButton from '../components/CustomButton';
import { useLogin } from '../context/LoginProvider';
import { FlatList } from 'react-native-gesture-handler';

const MenuScreen = () =>{
  const [recipes,setRecipies] = useState([]);
  const [search,setSearch] = useState();
  const [defaultRecipes, setdefaultRecipes] = useState([]);
  const [selected,setSelected] = useState(1);
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const [allLoaded,setAllLoaded] = useState(false);
  const [initialLoad,setInitialLoad] = useState(false);

const {profile} = useLogin();
  const  getAllRecipes = async() =>{
    setSelected(1);
    const res = await client.get(`/recipes/${1}`);
    setRecipies(res.data);
    setdefaultRecipes(res.data);
    let changePage = page+1;
    setPage(changePage);
  }

  const getMoreRecipes = async()=>{
    // if (loading || allLoaded)
    //   return;
    //  setLoading(true);
    
    // const res = await client.get(`/recipes/${page}`);
    // if(res.data.length == 0){
    //   setAllLoaded(true);
    // }
    // setRecipies([...recipes,...res.data]);

    // let changePage = page+1;
    // setPage(changePage);

    // setLoading(false);
    
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

  const getCustomRecipes = async() => {
    setSelected(2);
    setRecipies([]);
    // const res = await client.post('/customRecipes', {userId: profile._id});
     // setRecipies([...recipes,res.data]);
    // setdefaultRecipes([...defaultRecipes,res.data]);
  }
  
    return(
        <ScrollView  showsVerticalScrollIndicator={false} style = {styles.root}>
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

            <View style= {{flexDirection: 'row'}}>
            <View style={{alignItems:'left',flex: 1, width: "45%"}}>
            <CustomButton text="All Recipes" onPress={getAllRecipes} selected={selected} />
            </View>
            <View style={{alignItems:'right',width: "45%"}}>
            <CustomButton selected={selected} text="Custom Recipes" onPress={getCustomRecipes} />
            </View>
            </View>

        {
            recipes.length===0?(
                <Text>Please wait, while it loads</Text>
            ): (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent=
                      {loading &&
                        
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Loading More...</Text>
                        </View>
                        
                      }
                    onEndReached={info => {
                      getMoreRecipes(info);
                    }}
                    onEndReachedThreshold={0}
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
     flex: 1,
  },
   textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  footerText: {
    fontWeight: '600',
  },
  footer: {
    padding: 15,
  },

})
export default MenuScreen;