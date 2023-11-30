import React, {useState,useEffect} from 'react';
import { Text,View, SafeAreaView, Pressable,StyleSheet ,FlatList,ScrollView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function RequirementCard (props){
   const data = [
    { label: 'Low', value: '1' },
    { label: 'Medium', value: '2' },
    { label: 'High', value: '3' },
  ];

  const [value,setValue] = useState();

     
    useEffect(()=>{
        props.handleChangeRequirement(value,props.name);
    }, [value]);

 
  return(
     <View style ={{ flexDirection: 'row', width: "100%", marginTop:10, height: 60}} >
          <Text style= {{textAlign: 'left',flex:1,verticalAlign:'middle', fontSize: 20}}>{props.name}</Text>
            
             <View style = {{alignItems: 'right'}}>
             <Dropdown
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder="Select"
                  style={styles. dropdown}
                  placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                 onChange={item => {setValue(item.value)}}
                  value = {value}
                />
             </View>
      </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: 100
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});