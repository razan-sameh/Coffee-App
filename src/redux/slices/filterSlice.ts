import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type typFilterState = {
  categoryID: number[];
  intMinPrice: number;
  intMaxPrice: number;
  intMinRating: number;
  intMaxRating: number;
  strSearch: string;
  defaultPrice: {min: number; max: number}; // ✅ NEW
  defaultRating: {min: number; max: number}; // ✅ NEW
};

const initialState: typFilterState = {
  categoryID: [],
  intMinPrice: 0,
  intMaxPrice: 100,
  intMinRating: 1,
  intMaxRating: 5,
  strSearch: '',
  defaultPrice: {min: 0, max: 100}, // ✅ INITIAL VALUE
  defaultRating: {min: 1, max: 5}, // ✅ INITIAL VALUE
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryID(state, action: PayloadAction<number[]>) {
      state.categoryID = action.payload;
    },
    setPriceRange(state, action: PayloadAction<{min: number; max: number}>) {
      state.intMinPrice = action.payload.min;
      state.intMaxPrice = action.payload.max;
    },
    setRatingRange(state, action: PayloadAction<{min: number; max: number}>) {
      state.intMinRating = action.payload.min;
      state.intMaxRating = action.payload.max;
    },
    setSearch(state, action: PayloadAction<string>) {
      // ✅ added
      state.strSearch = action.payload;
    },
    setDefaultPrice(state, action: PayloadAction<{min: number; max: number}>) {
      state.defaultPrice = action.payload;
    },
    setDefaultRating(state, action: PayloadAction<{min: number; max: number}>) {
      state.defaultRating = action.payload;
    },
    resetFilters: state => {
      state.intMinPrice = state.defaultPrice.min;
      state.intMaxPrice = state.defaultPrice.max;
      state.intMinRating = state.defaultRating.min;
      state.intMaxRating = state.defaultRating.max;
      state.categoryID = [];
      state.strSearch = '';
    },
  },
});

export const {
  setCategoryID,
  setPriceRange,
  setRatingRange,
  setSearch, // ✅ exported
  resetFilters,
  setDefaultPrice, // ✅ export
  setDefaultRating, // ✅ export
} = filterSlice.actions;

export default filterSlice.reducer;
