import database from '@react-native-firebase/database';
import { typCategory, typRange, typProduct, typCart } from './Types';
import { Size } from './Enums';
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

// import { getAuth, listUsers } from "firebase/auth";

// const auth = getAuth();
// listUsers(auth)
//     .then((users: any) => {
//         console.log('Successfully fetched user data: ', users);
//     })
//     .catch((error: Error) => {
//         console.log('Error fetching user data: ', error);
//     });

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

export const addItemInCart = (Uid: string, productID: number, size: Size, count: number = 1) => {
    // Get a reference to the user's cart
    const userCartRef = database().ref(`cart/${Uid}`);

    // Create a unique key for the cart item using productID and size
    const itemKey = `${Uid}_${productID}`;

    // Fetch the current cart items for the user
    userCartRef.once('value')
        .then((snapshot) => {
            const cartItems = snapshot.val() || {};

            // Check if the item already exists in the cart
            if (cartItems[itemKey]) {
                // If item exists, update the count
                cartItems[itemKey].count += count;
            } else {
                // If item does not exist, add new item to the cart
                cartItems[itemKey] = {
                    Uid,
                    productID,
                    size,
                    count
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
};

export const decreaseCountItemInCart = (Uid: string, productID: number, count: number = 1) => {
    // Get a reference to the user's cart
    const userCartRef = database().ref(`cart/${Uid}`);

    // Create a unique key for the cart item using productID and size
    const itemKey = `${Uid}_${productID}`;

    // Fetch the current cart items for the user
    userCartRef.once('value')
        .then((snapshot) => {
            const cartItems = snapshot.val() || {};

            // Check if the item exists in the cart
            if (cartItems[itemKey]) {
                // If item exists, decrease the count but not less than 1
                cartItems[itemKey].count = Math.max(1, cartItems[itemKey].count - count);

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
};

export const removeItemFromCart = (Uid: string, productID: number) => {
    // Get a reference to the user's cart
    const userCartRef = database().ref(`cart/${Uid}`);

    // Create a unique key for the cart item using productID and size
    const itemKey = `${Uid}_${productID}`;

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


// export const removeFromCart = (Uid: string, productID: number, count: number) => {
//     // Get a reference to the user's cart
//     const userCartRef = database().ref(`cart/${Uid}`);

//     // Create a unique key for the cart item using productID and size
//     const itemKey = `${Uid}_${productID}`;

//     // Fetch the current cart items for the user
//     userCartRef.once('value')
//         .then((snapshot) => {
//             const cartItems = snapshot.val() || {};

//             // Check if the item exists in the cart
//             if (cartItems[itemKey]) {
//                 // Decrease the count of the item
//                 cartItems[itemKey].count -= count;

//                 // If the count reaches zero or below, delete the item from the cart
//                 if (cartItems[itemKey].count <= 0) {
//                     delete cartItems[itemKey];
//                 }

//                 // Update the user's cart in the database
//                 return userCartRef.set(cartItems);
//             } else {
//                 console.log('Item not found in cart');
//                 return Promise.resolve();  // Resolve the promise since no update is needed
//             }
//         })
//         .then(() => {
//             console.log('Cart updated successfully');
//         })
//         .catch((error) => {
//             console.error('Error updating cart:', error);
//         });
// };


// export const addToCart = (Uid: string, productID: number, size: string, count: number) => {
//     // Construct the cart item
//     const cartItem : typCart= {
//         Uid,
//         productID,
//         size,
//         count
//     };

//     // Get a reference to the user's cart
//     const userCartRef = database().ref(`cart/${Uid}`);

//     // Set the cart item in the user's cart
//     userCartRef.set(cartItem)
//         .then(() => {
//             console.log('Item added to cart successfully');
//         })
//         .catch((error) => {
//             console.error('Error adding item to cart:', error);
//         });
// };

