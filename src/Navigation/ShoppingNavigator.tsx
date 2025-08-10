import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Header} from '../Components/header/Header';
import {Filter} from '../screens/filter/Filter';
import {NoResultSearch} from '../screens/noResultSearch/NoResultSearch';
import {ProductDetails} from '../screens/productDetails/ProductDetails';
import {Shopping} from '../screens/shopping/Shopping';

const Stack = createStackNavigator();

const ShoppingNavigator = ({searchQuery, setSearchQuery}: any) => {
  return (
    <Stack.Navigator
      initialRouteName="Shopping"
      screenOptions={{
        animationEnabled: false,
        // eslint-disable-next-line react/no-unstable-nested-components
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
        children={() => <Shopping />}
      />
      <Stack.Screen
        name="NoResultSearch"
        options={{headerShown: false}}
        children={() => <NoResultSearch />}
      />
      <Stack.Screen
        name="Filter"
        options={{headerShown: false}}
        children={() => <Filter />}
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
