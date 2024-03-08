import database from '@react-native-firebase/database';
export const getCategory = async () => {
    try {
        const data = await database().ref('category').once('value');
        const aobjCategories = data.val();
        return aobjCategories;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProduct = async () => {
    try {
        const data = await database().ref('product').once('value');
        const aobjProducts = data.val();
        return aobjProducts;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// export const getCategoryTitleById = (categoryId : number) => {
//   database()
//   .ref(`/category/${categoryId}`)
//   .once('value')
//   .then(snapshot => {
//     const data = snapshot.val();
//     return  data.title
//   });
// };

