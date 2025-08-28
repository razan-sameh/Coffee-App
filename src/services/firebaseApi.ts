import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {typCategory, typOrder, typProduct} from '../Content/Types';
import database from '@react-native-firebase/database';
import {
  setDefaultPrice,
  setDefaultRating,
  setPriceRange,
  setRatingRange,
} from '../redux/slices/filterSlice';
import {store} from '../redux/store';

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['product', 'category', 'order'],
  endpoints: build => ({
    getProducts: build.query<typProduct[], void>({
      async queryFn() {
        try {
          const [productSnapshot, categorySnapshot] = await Promise.all([
            database().ref('product').once('value'),
            database().ref('category').once('value'),
          ]);

          const productRaw = productSnapshot.val() || {};
          const categoryRaw = categorySnapshot.val() || {};

          const categories = Object.entries(categoryRaw).reduce(
            (acc, [id, value]) => {
              const cat = {id, ...(value as Omit<typCategory, 'id'>)};
              acc[cat.ID] = cat;
              return acc;
            },
            {} as Record<string | number, typCategory>,
          );

          const products: typProduct[] = Object.entries(productRaw)
            .filter(([_, value]) => value) // filter out null
            .map(([id, value]) => {
              const v = value as Omit<typProduct, 'id' | 'category'> & {
                category?: number | string | null;
              };

              return {
                id,
                ...v,
                category:
                  v.category && categories[v.category]
                    ? categories[v.category]
                    : {ID: String(v.category ?? 'unknown'), title: 'Unknown'},
              };
            });

          let minPrice = Infinity;
          let maxPrice = -Infinity;
          let minRating = Infinity;
          let maxRating = -Infinity;

          for (const p of products) {
            if (p.price < minPrice) {
              minPrice = p.price;
            }
            if (p.price > maxPrice) {
              maxPrice = p.price;
            }
            if (p.rate < minRating) {
              minRating = p.rate;
            }
            if (p.rate > maxRating) {
              maxRating = p.rate;
            }
          }

          store.dispatch(setDefaultPrice({min: minPrice, max: maxPrice}));
          store.dispatch(setDefaultRating({min: minRating, max: maxRating}));
          store.dispatch(setPriceRange({min: minPrice, max: maxPrice}));
          store.dispatch(setRatingRange({min: minRating, max: maxRating}));

          return {data: products};
        } catch (error) {
          return {error};
        }
      },
      providesTags: result =>
        result
          ? [
              ...result.map(p => ({type: 'product' as const, id: p.ID})), // ✅ use `id`
              {type: 'product', id: 'LIST'},
            ]
          : [{type: 'product', id: 'LIST'}],
    }),

    getProductById: build.query<typProduct, string>({
      async queryFn(id) {
        try {
          const snap = await database().ref(`product/${id}`).once('value');
          const raw = snap.val();
          if (!raw) throw new Error('Product not found');
          return {data: {id, ...(raw as Omit<typProduct, 'id'>)}};
        } catch (error) {
          return {error};
        }
      },

      // 👇 live updates
      async onCacheEntryAdded(id, {updateCachedData, cacheEntryRemoved}) {
        const ref = database().ref(`product/${id}`);

        const listener = (snapshot: any) => {
          const raw = snapshot.val();
          if (raw) {
            updateCachedData(() => ({id, ...raw})); // ✅ update cache when db changes
          }
        };

        ref.on('value', listener);

        await cacheEntryRemoved;
        ref.off('value', listener);
      },

      providesTags: (_result, _error, id) => [{type: 'product', id}],
    }),

    updateProductRating: build.mutation<
      {success: boolean}, // 👈 define a return type
      {productId: string; newRate: number}
    >({
      async queryFn({productId, newRate}) {
        try {
          const ref = database().ref(`product/${productId}`);
          const snapshot = await ref.once('value');
          const product = snapshot.val();

          if (!product) {
            throw new Error('Product not found');
          }

          // calculate new rating values
          const rateSum = (product.rateSum || 0) + newRate;
          const rateCount = (product.rateCount || 0) + 1;
          const rate = rateSum / rateCount;

          await ref.update({rateSum, rateCount, rate});

          // ✅ always return something in data
          return {data: {success: true}};
        } catch (error: any) {
          return {error: {message: error.message}};
        }
      },
      invalidatesTags: (_result, _error, {productId}) => [
        {type: 'product', id: productId},
        {type: 'product', id: 'LIST'}, // 👈 also invalidate the list
      ],
    }),

    getOrderById: build.query<typOrder, string>({
      async queryFn(orderId) {
        try {
          const snap = await database().ref(`order/${orderId}`).once('value');
          const raw = snap.val();
          if (!raw) {
            throw new Error('Order not found');
          }
          return {data: {id: orderId, ...(raw as Omit<typOrder, 'id'>)}};
        } catch (error) {
          return {error};
        }
      },
      async onCacheEntryAdded(orderId, {updateCachedData, cacheEntryRemoved}) {
        const ref = database().ref(`order/${orderId}`);

        const listener = (snapshot: any) => {
          const updatedOrder = snapshot.val();
          if (updatedOrder) {
            updateCachedData(() => ({id: orderId, ...updatedOrder}));
          }
        };

        // start listening for changes
        ref.on('value', listener);

        // cleanup when subscription ends
        await cacheEntryRemoved;
        ref.off('value', listener);
      },
      providesTags: (_result, _error, orderId) => [
        {type: 'order', id: orderId},
      ],
    }),

    getCategories: build.query<typCategory[], void>({
      async queryFn() {
        return new Promise((resolve, reject) => {
          const ref = database().ref('category');

          const onDataChange = (snapshot: {val: () => any}) => {
            const raw = snapshot.val() || {};
            const list = Object.entries(raw).map(([id, v]) => ({
              id,
              ...(v as Omit<typCategory, 'id'>),
            }));
            resolve({data: list});
          };

          const onError = (error: any) => reject({error});

          ref.on('value', onDataChange, onError);
          return () => ref.off('value', onDataChange);
        });
      },
      providesTags: result =>
        result
          ? result.map(c => ({type: 'category' as const, id: c.ID}))
          : [{type: 'category', id: 'LIST'}],
    }),

    getOrdersByUserId: build.query<typOrder[], string>({
      async queryFn() {
        // empty initial state (RTKQ requires queryFn)
        return {data: []};
      },
      async onCacheEntryAdded(uid, {updateCachedData, cacheEntryRemoved}) {
        const ref = database().ref('order');

        const listener = (snapshot: any) => {
          const ordersObject = snapshot.val() || {};
          const orders: typOrder[] = Object.entries(ordersObject)
            .map(([id, value]) => ({id, ...(value as Omit<typOrder, 'id'>)}))
            .filter(order => order.userId === uid);

          // 🔥 update RTKQ cache whenever Firebase pushes
          updateCachedData(() => orders);
        };

        ref.on('value', listener);

        // cleanup when query unsubscribes
        await cacheEntryRemoved;
        ref.off('value', listener);
      },
      providesTags: (result, _error, uid) =>
        result
          ? [
              ...result.map(o => ({type: 'order' as const, id: o.id})),
              {type: 'order', id: `USER-${uid}`},
            ]
          : [{type: 'order', id: `USER-${uid}`}],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetOrderByIdQuery,
  useGetOrdersByUserIdQuery,
  useUpdateProductRatingMutation,
} = firebaseApi;
