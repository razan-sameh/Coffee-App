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
