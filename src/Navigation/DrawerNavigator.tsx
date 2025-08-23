/* eslint-disable react/react-in-jsx-scope */
import {createDrawerNavigator} from '@react-navigation/drawer';
import TapNavigator from './TapNavigator';
import CustomDrawer, {Styles} from '../Components/CustomDrawer';
import Orders from '../screens/orders/Orders';
import ProfileNavigator from './ProfileNavigator';

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
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="ProfileNavigator" component={ProfileNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
