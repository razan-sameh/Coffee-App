import React, {useEffect} from 'react';
import {useAppDispatch} from '../redux/store';
import {fetchFavourites} from '../redux/slices/favouriteSlice';
import {getUserID} from '../services/Authentication';
import {fetchCart} from '../redux/slices/cartSlice';

type Props = {
  children: React.ReactNode;
};

export const FavouriteProvider = ({children}: Props) => {
  const dispatch = useAppDispatch();
  const userId = getUserID();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavourites(userId));
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  return <>{children}</>;
};
