import database from '@react-native-firebase/database';
import { typCategory, typRange, typProduct } from './Types';
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