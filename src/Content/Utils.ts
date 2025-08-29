import {serverURL} from '../../App';
import {store} from '../redux/store';
import {firebaseApi} from '../services/firebaseApi';
import {typAddress, typLocation} from './Types';
import {Linking, Alert, Platform} from 'react-native';

export const fetchProductById = async (id: string) => {
  try {
    const result = await store.dispatch(
      firebaseApi.endpoints.getProductById.initiate(id),
    );

    if ('data' in result) {
      return result.data;
    } else {
      throw new Error((result as any).error?.message || 'Unknown error');
    }
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    throw err;
  }
};

export const simulateOrder = async (uid: string, orderId: string) => {
  try {
    const response = await fetch(
      `${serverURL}/api/notification/simulate-order/${uid}/${orderId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Error starting simulation:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

export const formatLocation = (
  loc: typLocation | typAddress | null | undefined,
) => {
  if (!loc) {
    return '';
  }

  // Determine if loc is a full Location object or just Address
  const address: typAddress | null = 'address' in loc ? loc.address : loc;

  // If address is null, fallback to lat/lng if available
  if (!address) {
    if ('latitude' in loc && 'longitude' in loc) {
      return `Lat: ${loc.latitude}, Lng: ${loc.longitude}`;
    }
    return '';
  }

  const parts = [
    address.house_number,
    address.road,
    address.city,
    address.country,
  ].filter(Boolean);

  return (
    parts.join(', ') ||
    ('latitude' in loc ? `${loc.latitude}, ${loc.longitude}` : '')
  );
};

export const getActiveRouteName = (state: any): string => {
  if (!state || !state.routes || state.index === undefined) {
    return '';
  }

  const route = state.routes[state.index];
  // console.log({ route });

  // 1. Dive into nested navigators if available
  if (route.state) {
    return getActiveRouteName(route.state);
  }

  // 2. If screen is passed via params
  if (route.params?.screen) {
    return route.params.screen;
  }

  // 3. Fallback: if it's TapNavigator with no state yet, return initial route
  if (route.name === 'TapNavigator') {
    return 'Home'; // match TapNavigator's initialRouteName
  }

  return route.name;
};

export const callPhoneNumber = (
  countryCode: string,
  number: string | number,
) => {
  if (!number) {
    Alert.alert('Phone number is not available');
    return;
  }

  let phoneNumber = number.toString().trim();
  let dialString = countryCode
    ? `${countryCode}${phoneNumber.replace(/^0+/, '')}`
    : phoneNumber;

  const url =
    Platform.OS === 'ios' ? `telprompt:${dialString}` : `tel:${dialString}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Error', `Cannot open dialer for ${dialString}`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('Error opening dialer', err));
};
