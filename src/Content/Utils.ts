import {serverURL} from '../../App';
import {store} from '../redux/store';
import {firebaseApi} from '../services/firebaseApi';
import {typAddress, typLocation} from './Types';

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

  // Dive into nested navigators
  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};
