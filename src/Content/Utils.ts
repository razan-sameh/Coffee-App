import { getProduct } from "./Database";
import { typProduct } from "./Types";

export const getProductByCategory = async (lngCategoryID: number[]) => {
  try {
    const aobjData: typProduct[] = await getProduct();
    const aobjFilteredProducts = aobjData.filter((objProduct: typProduct) => lngCategoryID.includes(objProduct.category));
    return aobjFilteredProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopRatedProduct = async () => {
  try {
    const aobjData: typProduct[] = await getProduct();
    const aobjFilteredProducts = aobjData.filter((objProduct: typProduct) => objProduct.rate >= 4);
    return aobjFilteredProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProducByRangePrice = async (aobjData: typProduct[], intMin: number, intMax: number) => {
  try {
    const aobjFilteredProducts = aobjData.filter((objProduct: typProduct) => objProduct.price >= intMin && objProduct.price <= intMax);
    return aobjFilteredProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
