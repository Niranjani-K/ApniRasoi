import {View,Text,TouchableOpacity} from 'react-native';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import PastOrdersScreen from '../screens/PastOrdersScreen';
import { useLogin } from '../context/LoginProvider';
import MenuScreen from '../screens/MenuScreen';
import MenuDishDetails from '../screens/MenuDishDetails';
import OrderPlacedScreen from '../screens/OrderPlacedScreen';
import BasketScreen from '../screens/BasketScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {

  const { Logout, profile } = useLogin();


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
            <Text  style= {{fontWeight: 'bold'}}>{profile.name}</Text>
            <Text style= {{fontWeight: 'bold'}}>{profile.email}</Text>
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
        <Text style= {{
          fontWeight: 'bold',
          color: '#FFC800',
        }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}
const AdminNavigator = () =>{
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
    backBehavior="history"
     drawerContent={props => <CustomDrawer {...props} />}
    >
     
      <Drawer.Screen component={PastOrdersScreen} name='Current Orders'/>
      <Drawer.Screen component={PastOrdersScreen} name='Past Orders'/>

      <Drawer.Screen component={MenuScreen} name='Menu' />
        <Drawer.Screen component={MenuDishDetails} name='MenuDishDetails'  options={{
                  drawerItemStyle: { display: 'none' }
        }} />

        <Drawer.Screen component={OrderStatusScreen} name='OrderStatus'  options={{
                        drawerItemStyle: { display: 'none' }
                }} />

    </Drawer.Navigator>
    
  )
}


export default AdminNavigator;