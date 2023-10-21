import {View,Text,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import PastOrdersScreen from '../screens/PastOrdersScreen';
import { useLogin,Logout } from '../context/LoginProvider';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {

  const { setIsLoggedIn, profile } = useLogin();


  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text>{profile.name}</Text>
            <Text>{profile.email}</Text>
          </View>
          </View>
          <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}

        onPress={() => Logout()}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}
const DrawerNavigator = () =>{
  return(
    <Drawer.Navigator 
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitle: '',
    }}
     drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={HomeScreen} name='Home' />
      <Drawer.Screen component={PastOrdersScreen} name='PastOrders' />
    </Drawer.Navigator>
  )
}


export default DrawerNavigator;