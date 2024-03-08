import { getProduct } from "./Firebase";
import { typProduct } from "./Types";

export const getProductByCategory = async (lngCategoryID: number) => {
  try {
    const aobjData : typProduct[]= await getProduct();
    const aobjFilteredProducts = aobjData.filter((objProduct: typProduct) => objProduct.category === lngCategoryID);
    return aobjFilteredProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopRatedProduct = async () => {
  try {
    const aobjData : typProduct[]= await getProduct();
    const aobjFilteredProducts = aobjData.filter((objProduct: typProduct) => objProduct.rate >= 4);
    return aobjFilteredProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

