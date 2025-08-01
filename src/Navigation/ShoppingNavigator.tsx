import React from 'react';
import {Shopping} from '../screens/Shopping';
import {createStackNavigator} from '@react-navigation/stack';
import {NoResultSearch} from '../screens/NoResultSearch';
import {Header} from '../Components/Header';
import {Filter} from '../screens/Filter';
import {ProductDetails} from '../screens/ProductDetails';
import {useFocusEffect} from '@react-navigation/native';

const Stack = createStackNavigator();

const ShoppingNavigator = ({searchQuery, setSearchQuery}: any) => {
  return (
    <Stack.Navigator
      initialRouteName="Shopping"
      screenOptions={{
        animationEnabled: false,
        header: navigation => (
          <Header
            {...navigation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ),
      }}>
      <Stack.Screen
        name="Shopping"
        options={{headerShown: true}}
        children={props => <Shopping {...props} />}
      />
      <Stack.Screen
        name="NoResultSearch"
        options={{headerShown: false}}
        children={() => <NoResultSearch />}
      />
      <Stack.Screen
        name="Filter"
        options={{headerShown: false}}
        children={navigation => <Filter navigation={navigation} />}
      />
      <Stack.Screen
        name="ProductDetails"
        options={{headerShown: false}}
        children={navigation => <ProductDetails navigation={navigation} />}
      />
    </Stack.Navigator>
  );
};

export default ShoppingNavigator;
