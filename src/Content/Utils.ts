import {serverURL} from '../../App';
import {store} from '../redux/store';
import {firebaseApi} from '../services/firebaseApi';

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
