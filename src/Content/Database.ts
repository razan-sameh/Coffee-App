import database from '@react-native-firebase/database';
import {typCart, typUser} from './Types';
import {enmRole, enmSize} from './Enums';
import {fetchProductById} from './Utils';

export const addItemInCart = async (
  Uid: string,
  productID: string,
  size: enmSize,
  count: number = 1,
): Promise<void> => {
  const userCartRef = database().ref(`cart/${Uid}`);
  const itemKey = `${Uid}_${productID}_${size}`;

  try {
    const product = await fetchProductById(productID);

    if (!product) {
      throw new Error('Product not found');
    }

    const snapshot = await userCartRef.once('value');
    const cartItems = snapshot.val() || {};

    if (cartItems[itemKey]) {
      cartItems[itemKey].count += count;
      cartItems[itemKey].price = product.price * cartItems[itemKey].count;
    } else {
      cartItems[itemKey] = {
        Uid,
        productID,
        size,
        count,
        price: product.price * count,
      };
    }

    await userCartRef.set(cartItems);
    console.log('Cart updated successfully');
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const updateItemInCart = async (
  Uid: string,
  productID: string,
  oldSize: enmSize,
  newSize: enmSize,
  newCount: number,
): Promise<{
  productID: string;
  size: enmSize;
  count: number;
  price: number;
}> => {
  const userCartRef = database().ref(`cart/${Uid}`);
  const oldItemKey = `${Uid}_${productID}_${oldSize}`;
  const newItemKey = `${Uid}_${productID}_${newSize}`;

  try {
    const product = await fetchProductById(productID);
    if (!product) {
      throw new Error('Product not found');
    }

    const snapshot = await userCartRef.once('value');
    const cartItems = snapshot.val() || {};

    if (cartItems[oldItemKey]) {
      delete cartItems[oldItemKey];

      const price = product.price * newCount;

      cartItems[newItemKey] = {
        Uid,
        productID,
        size: newSize,
        count: newCount,
        price,
      };

      await userCartRef.set(cartItems);
      console.log('Cart updated successfully');

      return {
        productID,
        size: newSize,
        count: newCount,
        price,
      };
    } else {
      throw new Error('Old item does not exist in the cart');
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const decreaseCountItemInCart = async (
  Uid: string,
  productID: string,
  size: enmSize,
): Promise<{
  productID: string;
  size: enmSize;
  count: number;
  price: number;
}> => {
  const userCartRef = database().ref(`cart/${Uid}`);
  const itemKey = `${Uid}_${productID}_${size}`;

  try {
    const product = await fetchProductById(productID);
    if (!product) {
      throw new Error('Product not found');
    }

    const snapshot = await userCartRef.once('value');
    const cartItems = snapshot.val() || {};

    if (cartItems[itemKey]) {
      const newCount = Math.max(1, cartItems[itemKey].count - 1);
      const newPrice = product.price * newCount;

      cartItems[itemKey].count = newCount;
      cartItems[itemKey].price = newPrice;

      await userCartRef.set(cartItems);

      return {
        productID,
        size,
        count: newCount,
        price: newPrice,
      };
    } else {
      throw new Error('Item does not exist in the cart');
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const removeItemFromCart = async (
  Uid: string,
  productID: number,
  size: enmSize,
): Promise<void> => {
  const userCartRef = database().ref(`cart/${Uid}`);
  const itemKey = `${Uid}_${productID}_${size}`;

  try {
    const snapshot = await userCartRef.once('value');
    const cartItems = snapshot.val() || {};

    if (cartItems[itemKey]) {
      delete cartItems[itemKey];
      await userCartRef.set(cartItems);
      console.log('Item removed from cart successfully');
    } else {
      throw new Error('Item does not exist in the cart');
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const getCartItems = (Uid: string): Promise<typCart[]> => {
  return new Promise((resolve, reject) => {
    database()
      .ref(`cart/${Uid}`)
      .once('value')
      .then(snapshot => {
        const cartItemsObject = snapshot.val() || {};
        const cartItems: typCart[] = Object.values(cartItemsObject);
        resolve(cartItems);
      })
      .catch(error => {
        console.error('Error retrieving cart items:', error);
        reject(error);
      });
  });
};

export const getCartItemDetails = (
  Uid: string,
  productID: string,
  size: enmSize,
): Promise<{size: enmSize; count: number} | null> => {
  const itemRef = database().ref(`cart/${Uid}/${Uid}_${productID}_${size}`);

  return new Promise((resolve, reject) => {
    itemRef
      .once('value')
      .then(snapshot => {
        const itemDetails = snapshot.val();
        if (itemDetails) {
          resolve({size: itemDetails.size, count: itemDetails.count});
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        console.error('Error retrieving item details:', error);
        reject(null);
      });
  });
};

// Create new user
export const createUser = async (
  Uid: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<void> => {
  const reference = database().ref(`/user/${Uid}`);
  await reference.set({
    Uid,
    firstName,
    lastName,
    email,
    password,
    isActive: true,
    role: enmRole.customer,
  });
};

// Fetch user data
export const getUserById = async (Uid: string): Promise<typUser> => {
  const snapshot = await database().ref(`/user/${Uid}`).once('value');
  return snapshot.val();
};

// Update user password
export const changeUserPassword = async (
  Uid: string,
  newPassword: string,
): Promise<void> => {
  const reference = database().ref(`/user/${Uid}`);
  await reference.update({password: newPassword});
};

// Add address and phone number
export const addUserDetailsToFirebase = async (
  Uid: string,
  address?: string,
  phoneNumber?: string,
): Promise<void> => {
  const userRef = database().ref(`user/${Uid}`);
  const snapshot = await userRef.once('value');

  if (snapshot.exists()) {
    const userData = snapshot.val();
    const addresses = userData.address ?? [];
    const phoneNumbers = userData.phoneNumber ?? [];

    if (!addresses.includes(address)) {
      addresses.push(address);
    }
    if (!phoneNumbers.includes(phoneNumber)) {
      phoneNumbers.push(phoneNumber);
    }

    await userRef.update({address: addresses, phoneNumber: phoneNumbers});
  } else {
    await userRef.set({
      address: [address],
      phoneNumber: [phoneNumber],
    });
  }
};
