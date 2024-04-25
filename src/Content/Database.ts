import database from '@react-native-firebase/database';
import { typCategory, typPriceRange, typProduct } from './Types';
export const getCategory = async () : Promise<typCategory[]>   => {
    try {
        const data = await database().ref('category').once('value');
        const aobjCategories = data.val();
        return aobjCategories;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProduct = async () : Promise<typProduct[]>  => {
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
    let tpvPriceRange: typPriceRange={
        intMax:Number.NEGATIVE_INFINITY,
        intMin:Number.POSITIVE_INFINITY
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


