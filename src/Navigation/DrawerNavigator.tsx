import { createDrawerNavigator } from '@react-navigation/drawer';
import TapNavigator from './TapNavigator';
import CustomDrawer, { Styles } from '../Components/CustomDrawer';
import Login from '../screens/Login';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ routeName }: any) => {
    return (
        <Drawer.Navigator
            initialRouteName='Ads'
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    borderTopRightRadius: Styles.mainContainer.borderTopRightRadius,
                    backgroundColor: Styles.mainContainer.backgroundColor,
                    width: '75%',
                },
            }}>
            <Drawer.Screen name="TapNavigator" children={(navigation) => <TapNavigator {...navigation} routeName={routeName} />} />
            <Drawer.Screen name="Profile" children={(navigation) => <TapNavigator {...navigation} routeName={routeName} />} />
            <Drawer.Screen name="Favourite" children={(navigation) => <TapNavigator {...navigation} routeName={routeName} />} />
            <Drawer.Screen name="Setting" children={(navigation) => <TapNavigator {...navigation} routeName={routeName} />} />
            <Drawer.Screen name="Help" children={(navigation) => <TapNavigator {...navigation} routeName={routeName} />} />
            <Drawer.Screen name="LogOut" component={Login} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
