/* eslint-disable react/react-in-jsx-scope */
import {createDrawerNavigator} from '@react-navigation/drawer';
import TapNavigator from './TapNavigator';
import CustomDrawer, {Styles} from '../Components/CustomDrawer';
import Login from '../screens/login/Login';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({routeName}: any) => {
  return (
    <Drawer.Navigator
      initialRouteName="TapNavigator"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          borderTopRightRadius: Styles.mainContainer.borderTopRightRadius,
          backgroundColor: Styles.mainContainer.backgroundColor,
          width: '75%',
        },
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Drawer.Screen
        name="TapNavigator"
        children={navigation => (
          <TapNavigator {...navigation} routeName={routeName} />
        )}
      />
      <Drawer.Screen
        name="Profile"
        children={navigation => (
          <TapNavigator {...navigation} routeName={routeName} />
        )}
      />
      <Drawer.Screen
        name="Favourite"
        children={navigation => (
          <TapNavigator {...navigation} routeName={routeName} />
        )}
      />
      <Drawer.Screen
        name="Setting"
        children={navigation => (
          <TapNavigator {...navigation} routeName={routeName} />
        )}
      />
      <Drawer.Screen
        name="Help"
        children={navigation => (
          <TapNavigator {...navigation} routeName={routeName} />
        )}
      />
      <Drawer.Screen name="LogOut" component={Login} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
