import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {typCategory, typProduct} from '../Content/Types';
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
  tagTypes: ['product', 'category'],
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

          const products: typProduct[] = Object.entries(productRaw).map(
            ([id, value]) => {
              const v = value as Omit<typProduct, 'id' | 'category'> & {
                category: number | string;
              };
              return {
                id,
                ...v,
                category: categories[v.category] || {
                  ID: v.category,
                  title: 'Unknown',
                },
              };
            },
          );

          // ✅ Calculate min/max price and rating
          let minPrice = Infinity;
          let maxPrice = -Infinity;
          let minRating = Infinity;
          let maxRating = -Infinity;

          for (const p of products) {
            if (p.price < minPrice) minPrice = p.price;
            if (p.price > maxPrice) maxPrice = p.price;
            if (p.rate < minRating) minRating = p.rate;
            if (p.rate > maxRating) maxRating = p.rate;
          }

          // ✅ Dispatch to filterSlice
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
          ? result.map(p => ({type: 'product' as const, id: p.ID}))
          : [{type: 'product', id: 'LIST'}],
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
  }),
});

export const {useGetProductsQuery, useGetCategoriesQuery} = firebaseApi;
