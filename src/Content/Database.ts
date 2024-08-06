import database from '@react-native-firebase/database';
import { typCategory, typRange, typProduct, typCart, typUser } from './Types';
import { Size } from './Enums';
import { getProductsByID } from './Utils';

export const getCategory = async (): Promise<typCategory[]> => {
    try {
        const data = await database().ref('category').once('value');
        const aobjCategories = data.val();
        return aobjCategories;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProduct = async (): Promise<typProduct[]> => {
    try {
        const data = await database().ref('product').once('value');
        const aobjProducts = data.val();
        return aobjProducts;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProductById = async (productId: number): Promise<typProduct> => {
    try {
        const snapshot = await database()
            .ref(`/product/${productId}`)
            .once('value');
        const data = snapshot.val();
        return data;
    } catch (error) {
        console.error("Error getting product by ID:", error);
        throw error;
    }
}

export const getMinAndMaxPrice = async (): Promise<typRange> => {
    const data = await database().ref('product').once('value');
    const aobjProducts = data.val();
    let tpvPriceRange: typRange = {
        intMax: Number.NEGATIVE_INFINITY,
        intMin: Number.POSITIVE_INFINITY
    }
    aobjProducts.forEach((product: any) => {
        if (product.hasOwnProperty('price') && typeof product.price === 'number') {
            if (product.price < tpvPriceRange.intMin) {
                tpvPriceRange.intMin = product.price;
            }
            if (product.price > tpvPriceRange.intMax) {
                tpvPriceRange.intMax = product.price;
            }
        }
    });
    return tpvPriceRange;
}

export const setItemsInFavourite = (Uid: string, productId: number) => {
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

export const removeItemFromFavourite = (Uid: string, productId: number) => {
    try {
        // Fetch the current list of favorite products
        database()
            .ref(`favourite/${Uid}`)
            .once('value')
            .then(snapshot => {
                const data = snapshot.val();
                let updatedProducts = [];
                if (data && data.Products) {
                    updatedProducts = data.Products.filter((id: number) => id !== productId); // Remove the product ID from the list
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

export const addItemInCart =  (Uid: string, productID: number, size: Size, count: number = 1) => {
    // Get a reference to the user's cart
    const userCartRef = database().ref(`cart/${Uid}`);

    // Create a unique key for the cart item using productID and size
    const itemKey = `${Uid}_${productID}_${size}`;
    getProductsByID([productID]).then((product : typProduct[])=>{
        // Fetch the current cart items for the user
        userCartRef.once('value')
            .then((snapshot) => {
                const cartItems = snapshot.val() || {};
    
                // Check if the item already exists in the cart
                if (cartItems[itemKey]) {
                    // If item exists, update the count
                    cartItems[itemKey].count += count;
                    cartItems[itemKey].price = (product[0].price * cartItems[itemKey].count);
                } else {
                    // If item does not exist, add new item to the cart
                    cartItems[itemKey] = {
                        Uid,
                        productID,
                        size,
                        count,
                        price: (product[0].price * count)
                    };
                }
                // Update the user's cart in the database
                return userCartRef.set(cartItems);
            })
            .then(() => {
                console.log('Cart updated successfully');
            })
            .catch((error) => {
                console.error('Error updating cart:', error);
            });
    })
};

export const updateItemInCart = (Uid: string, productID: number, oldSize: Size, newSize: Size, newCount: number) => {
    // Get a reference to the user's cart
    const userCartRef = database().ref(`cart/${Uid}`);
    // Create a unique key for the old item and new item using productID and size
    const oldItemKey = `${Uid}_${productID}_${oldSize}`;
    const newItemKey = `${Uid}_${productID}_${newSize}`;
    getProductsByID([productID]).then((product:typProduct[])=>{
        // Fetch the current cart items for the user
        userCartRef.once('value')
            .then((snapshot) => {
                const cartItems = snapshot.val() || {};
                // Check if the old item exists in the cart
                if (cartItems[oldItemKey]) {
                    // Remove the old item from the cart
                    delete cartItems[oldItemKey];
                    // Add or update the new item in the cart with the new count
                    cartItems[newItemKey] = {
                        Uid,
                        productID,
                        size: newSize,
                        count: newCount,
                        price : product[0].price * newCount
                    };
                    // Update the user's cart in the database
                    return userCartRef.set(cartItems);
                } else {
                    throw new Error('Old item does not exist in the cart');
                }
            })
            .then(() => {
                console.log('Cart updated successfully');
            })
            .catch((error) => {
                console.error('Error updating cart:', error);
            });
    })
};

export const decreaseCountItemInCart = (Uid: string, productID: number, size: Size) => {
    // Get a reference to the user's cart
    const userCartRef = database().ref(`cart/${Uid}`);

    // Create a unique key for the cart item using productID and size
    const itemKey = `${Uid}_${productID}_${size}`;
    getProductsByID([productID]).then((product : typProduct[])=>{
        // Fetch the current cart items for the user
        userCartRef.once('value')
            .then((snapshot) => {
                const cartItems = snapshot.val() || {};
    
                // Check if the item exists in the cart
                if (cartItems[itemKey]) {
                    // If item exists, decrease the count but not less than 1
                    cartItems[itemKey].count = Math.max(1, cartItems[itemKey].count - 1);
                    cartItems[itemKey].price = (product[0].price * cartItems[itemKey].count);
                    // Update the user's cart in the database
                    return userCartRef.set(cartItems);
                } else {
                    throw new Error('Item does not exist in the cart');
                }
            })
            .then(() => {
                console.log('Cart updated successfully');
            })
            .catch((error) => {
                console.error('Error updating cart:', error);
            });
    })
};

export const removeItemFromCart = (Uid: string, productID: number, size: Size) => {
    // Get a reference to the user's cart
    const userCartRef = database().ref(`cart/${Uid}`);

    // Create a unique key for the cart item using productID and size
    const itemKey = `${Uid}_${productID}_${size}`;

    // Fetch the current cart items for the user
    userCartRef.once('value')
        .then((snapshot) => {
            const cartItems = snapshot.val() || {};

            // Check if the item exists in the cart
            if (cartItems[itemKey]) {
                // Remove the item from the cart
                delete cartItems[itemKey];

                // Update the user's cart in the database
                return userCartRef.set(cartItems);
            } else {
                throw new Error('Item does not exist in the cart');
            }
        })
        .then(() => {
            console.log('Item removed from cart successfully');
        })
        .catch((error) => {
            console.error('Error removing item from cart:', error);
        });
};

export const getCartItems = (Uid: string, callback: (cartItems: typCart[]) => void) => {
    // Get a reference to the user's cart
    database().ref(`cart/${Uid}`).on('value', (snapshot) => {
        const cartItemsObject = snapshot.val() || {};
        // Convert the cartItems object to an array
        const cartItems: typCart[] = Object.values(cartItemsObject);
        callback(cartItems);
    }, (error) => {
        console.error('Error retrieving cart items:', error);
    });
};

export const getCartItemDetails = (Uid: string, productID: number, size: Size, callback: (itemDetails: { size: Size, count: number } | null) => void) => {
    // Get a reference to the specific cart item
    const itemRef = database().ref(`cart/${Uid}/${Uid}_${productID}_${size}`);

    // Listen for changes to the specific cart item
    itemRef.on('value', (snapshot) => {
        const itemDetails = snapshot.val();
        if (itemDetails) {
            callback({ size: itemDetails.size, count: itemDetails.count });
        } else {
            callback(null); // Item not found
        }
    }, (error) => {
        console.error('Error retrieving item details:', error);
        callback(null); // Error occurred
    });

    // Return the item reference to allow cleanup
    return itemRef;
};

export const addUser = (Uid: string, strName: string, strEmail: string, strPassword: string) => {
    const reference = database().ref(`/user/${Uid}`);
    reference.set({
        Uid,
        name : strName,
        email : strEmail,
        password : strPassword
    })
        .then(() => console.log('User data inserted successfully'))
        .catch(error => console.error('Error inserting user data:', error));
};

export const getUserInfo = async (Uid: string): Promise<typUser> => {
    try {
        const snapshot = await database()
            .ref(`/user/${Uid}`)
            .once('value');
        const data = snapshot.val();
        return data;
    } catch (error) {
        console.error("Error getting user by ID:", error);
        throw error;
    }
}

export const updateUserPassword = (Uid: string, newPassword:string) => {
    const reference = database().ref(`/user/${Uid}`);
    reference.update({
        password: newPassword
    })
        .then(() => console.log('User password updated successfully'))
        .catch(error => console.error('Error updating user password:', error));
};

export const addUserDetails = async (Uid: string, address: string, phoneNumber: string) => {
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
