import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, SectionList, View } from 'react-native';
import { Styles } from '../styles/Favourite';
import { typProduct } from '../Content/Types';
import { Product } from '../Components/Product';
import { getFavouriteList, getProduct } from '../Content/Database';
import { getProducByRangePrice, getProductByCategory } from '../Content/Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '../Content/resources';
import FastImage from 'react-native-fast-image';
import { getUserID } from '../Content/Authentication';

export function Favourite({ ...props }: any) {
    const [sections, setSections] = useState<{ title: string, data: typProduct[][] }[]>([]);
    const objListRef = useRef<SectionList>(null);
    const [alngCategoryID, setSelectedCategoryID] = useState<number[]>([]);
    const [intMinPrice, setMinPrice] = useState<number>(1.99);
    const [intMaxPrice, setMaxPrice] = useState<number>(5.99);
    const strUserID = getUserID();
    // const intMinPriceParam = props.route.params?.intMinPrice;
    // const intMaxPriceParam = props.route.params?.intMaxPrice;
    // const intcategoryIDParam = props.route.params?.categoryID;

    // useEffect(() => {
    //     if (intMinPriceParam) {
    //         setMinPrice(intMinPriceParam)
    //     }
    //     if (intMaxPriceParam) {
    //         setMaxPrice(intMaxPriceParam)
    //     }
    // }, [intMinPriceParam, intMaxPriceParam]);

    // useEffect(() => {
    //     if (intcategoryIDParam !== undefined) {
    //         if (typeof intcategoryIDParam == 'object') {
    //             intcategoryIDParam.map((item: number) => {
    //                 setSelectedCategoryID(prevState => [...prevState, item]);
    //             })
    //         }
    //         else {
    //             setSelectedCategoryID([intcategoryIDParam])
    //         }
    //     }
    //     return () => {
    //         setSections([]);
    //         setSelectedCategoryID([]);
    //     };
    // }, [intcategoryIDParam]);

    useEffect(() => {
        if (strUserID) {
            getFavouriteList(strUserID)
        }
        fetchProductsData();
    }, [alngCategoryID]);


    const fetchProductsData = async () => {
        let aObjData: typProduct[] = [];
        if (alngCategoryID.length > 0) {
            aObjData = await getProductByCategory(alngCategoryID);
        }
        else if (alngCategoryID.length === 0) {
            aObjData = await getProduct();
        }
        if (intMinPrice != 1.99 || intMaxPrice != 5.99) {
            aObjData = await getProducByRangePrice(aObjData, intMinPrice, intMaxPrice)
        }
        const sectionData = { title: 'All Products', data: [aObjData] };
        setSections([sectionData]);
    };

    const renderRow = useCallback(
        ({ item }: { item: typProduct[] }) => (
            <View style={Styles.productContainer}>
                {item.map((product, index) => (
                    <Product key={index} product={product} navigation={props} />
                ))}
            </View>
        ),
        [],
    );

    return (
        <View style={Styles.wall}>
            <TouchableOpacity style={Styles.filterContainer}
                onPress={() => { props.navigation.navigate('ShoppingNavigator', { screen: 'Filter' }); }}>
                <FastImage resizeMode='contain' style={Styles.filterIcon} source={images.FilterIcon} />
            </TouchableOpacity>
            <SafeAreaView>
                <SectionList
                    ref={objListRef}
                    sections={sections}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderRow}
                    style={Styles.mainContainer}
                    removeClippedSubviews
                    maxToRenderPerBatch={45}
                    updateCellsBatchingPeriod={65}
                    initialNumToRender={50}
                    viewabilityConfig={{
                        minimumViewTime: 500,
                        itemVisiblePercentThreshold: 100,
                        waitForInteraction: true,
                    }}
                />
            </SafeAreaView>
        </View>
    );
}
