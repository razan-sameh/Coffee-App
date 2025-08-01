import database from '@react-native-firebase/database';
import {typCart, typUser} from './Types';
import {enmRole, enmSize} from './Enums';
import {fetchProductById} from './Utils';

export const setItemsInFavourite = (Uid: string, productId: string) => {
  try {
    // Fetch the current list of favorite products
    database()
      .ref(`favourite/${Uid}`)
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        let updatedProducts = [];
        if (data && data.Products) {
          updatedProducts = [...data.Products]; // Copy existing products
          if (!updatedProducts.includes(productId)) {
            updatedProducts.push(productId); // Add new product if not already in the list
          }
        } else {
          updatedProducts.push(productId); // If no existing list, create a new one
        }
        // Update the database with the updated list
        database()
          .ref(`favourite/${Uid}`)
          .set({
            Uid: Uid,
            Products: updatedProducts,
          })
          .then(() => console.log('Product insert in favorites successfully.'));
      });
  } catch (error) {
    console.error(error);
  }
};

export const removeItemFromFavourite = (Uid: string, productId: string) => {
  try {
    // Fetch the current list of favorite products
    database()
      .ref(`favourite/${Uid}`)
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        let updatedProducts = [];
        if (data && data.Products) {
          updatedProducts = data.Products.filter(
            (id: string) => id !== productId,
          ); // Remove the product ID from the list
        }
        // Update the database with the updated list
        database()
          .ref(`favourite/${Uid}`)
          .set({
            Uid: Uid,
            Products: updatedProducts,
          })
          .then(() => console.log('Product removed from favorites.'));
      });
  } catch (error) {
    console.error(error);
  }
};

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
    if (!product) throw new Error('Product not found');

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

export const addUser = (
  Uid: string,
  strName: string,
  strEmail: string,
  strPassword: string,
) => {
  const reference = database().ref(`/user/${Uid}`);
  reference
    .set({
      Uid,
      name: strName,
      email: strEmail,
      password: strPassword,
      isActive: true,
      role: enmRole.customer,
    })
    .then(() => console.log('User data inserted successfully'))
    .catch(error => console.error('Error inserting user data:', error));
};

export const getUserInfo = async (Uid: string): Promise<typUser> => {
  try {
    const snapshot = await database().ref(`/user/${Uid}`).once('value');
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
};

export const updateUserPassword = (Uid: string, newPassword: string) => {
  const reference = database().ref(`/user/${Uid}`);
  reference
    .update({
      password: newPassword,
    })
    .then(() => console.log('User password updated successfully'))
    .catch(error => console.error('Error updating user password:', error));
};

export const addUserDetails = async (
  Uid: string,
  address: string,
  phoneNumber: string,
) => {
  try {
    const userRef = database().ref(`user/${Uid}`);
    // Check if the user already exists
    const snapshot = await userRef.once('value');
    if (snapshot.exists()) {
      const userData = snapshot.val();
      // Initialize address and phoneNumber as arrays if they don't already exist
      const addresses = userData.address ? userData.address : [];
      const phoneNumbers = userData.phoneNumber ? userData.phoneNumber : [];

      // Add new address and phoneNumber to arrays
      if (!addresses.includes(address)) {
        addresses.push(address);
      }
      if (!phoneNumbers.includes(phoneNumber)) {
        phoneNumbers.push(phoneNumber);
      }

      // Update user data
      await userRef.update({
        address: addresses,
        phoneNumber: phoneNumbers,
      });
      console.log('Address and phone number updated.');
    } else {
      // If user doesn't exist, create the user with address and phoneNumber as arrays
      await userRef.set({
        address: [address],
        phoneNumber: [phoneNumber],
      });
      console.log('User created with address and phone number.');
    }
  } catch (error) {
    console.error('Error updating user details:', error);
  }
};

export const getAddressByUid = async (Uid: string) => {
  try {
    const userRef = database().ref(`user/${Uid}`);
    // Fetch user data
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
      const userData = snapshot.val();

      // Check if the address field exists
      if (userData.address && Array.isArray(userData.address)) {
        console.log('Addresses:', userData.address);
        return userData.address;
      } else {
        console.log('Address field not found or is not an array.');
        return [];
      }
    } else {
      console.log('User does not exist.');
      return [];
    }
  } catch (error) {
    console.error('Error retrieving address:', error);
    return [];
  }
};

export const getPhoneNumberByUid = async (Uid: string) => {
  try {
    const userRef = database().ref(`user/${Uid}`);
    // Fetch user data
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
      const userData = snapshot.val();

      // Check if the phoneNumber field exists and is an array
      if (userData.phoneNumber && Array.isArray(userData.phoneNumber)) {
        console.log('Phone Numbers:', userData.phoneNumber);
        return userData.phoneNumber;
      } else {
        console.log('PhoneNumber field not found or is not an array.');
        return [];
      }
    } else {
      console.log('User does not exist.');
      return [];
    }
  } catch (error) {
    console.error('Error retrieving phone number:', error);
    return [];
  }
};
