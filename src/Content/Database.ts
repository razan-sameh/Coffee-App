import database from '@react-native-firebase/database';
import { typCategory, typPriceRange, typProduct } from './Types';
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


export const getMinAndMaxPrice = async (): Promise<typPriceRange> => {
    const data = await database().ref('product').once('value');
    const aobjProducts = data.val();
    let tpvPriceRange: typPriceRange = {
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

export const getFavouriteList = async (Uid: string): Promise<[]> => {
    try {
        const data = await database().ref(`favourite/${Uid}`).once('value');
        const aintProductsID = data.val().Products;
        console.log('aintProductsID',aintProductsID);
        return aintProductsID;
    } catch (error) {
        console.error(error);
        return [];
    }
};
export const isProductInFavouriteList = async (Uid: string, productId: number): Promise<boolean> => {
    try {
        const data = await database().ref(`favourite/${Uid}`).once('value');
        const aintProductsID = data.val().Products;
        if (aintProductsID.includes(productId)) {
            console.log('productId',productId);
            console.log('true');
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

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
                    .then(() => console.log('Data set.'));
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
                    updatedProducts = data.Products.filter((id : number) => id !== productId); // Remove the product ID from the list
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