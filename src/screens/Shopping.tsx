import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, SectionList, View } from 'react-native';
import { Styles } from '../styles/Shopping';
import { typProduct } from '../Content/Types';
import { Product } from '../Components/Product';
import { getProduct } from '../Content/Database';
import { getProducByRangePrice, getProducByRangeRating, getProductByCategory } from '../Content/Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '../Content/resources';
import FastImage from 'react-native-fast-image';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export function Shopping({ ...props }: any) {
    const [sections, setSections] = useState<{ title: string, data: typProduct[][] }[]>([]);
    const objListRef = useRef<SectionList>(null);
    const [alngCategoryID, setSelectedCategoryID] = useState<number[]>([]);
    const [intMinPrice, setMinPrice] = useState<number>(0);
    const [intMaxRating, setMaxRating] = useState<number>(0);
    const [intMinRating, setMinRating] = useState<number>(0);
    const [intMaxPrice, setMaxPrice] = useState<number>(0);
    const intMinPriceParam = props.route.params?.intMinPrice;
    const intMaxPriceParam = props.route.params?.intMaxPrice;
    const intMinRatingParam = props.route.params?.intMinRating;
    const intMaxRatingParam = props.route.params?.intMaxRating;
    const aintcategoryIDParam = props.route.params?.categoryID;
    const strSearchParam = props.route.params?.strSearch;
    const navigation : NavigationProp<ParamListBase>= useNavigation();

    useEffect(() => {
        if (intMinPriceParam) {
            setMinPrice(intMinPriceParam)
        }
        if (intMaxPriceParam) {
            setMaxPrice(intMaxPriceParam)
        }
    }, [intMinPriceParam, intMaxPriceParam]);

    useEffect(() => {
        if (intMinRatingParam) {
            setMinRating(intMinRatingParam)
        }
        if (intMaxRatingParam) {
            setMaxRating(intMaxRatingParam)
        }
    }, [intMinRatingParam, intMaxRatingParam]);

    useEffect(() => {
        if (aintcategoryIDParam !== undefined) {
            if (typeof aintcategoryIDParam == 'object') {
                aintcategoryIDParam.map((item: number) => {
                    setSelectedCategoryID(prevState => [...prevState, item]);
                })
            }
            else {
                setSelectedCategoryID([aintcategoryIDParam])
            }
        }
        return () => {
            setSections([]);
            setSelectedCategoryID([]);
        };
    }, [aintcategoryIDParam]);

    useEffect(() => {
        fetchProductsData(strSearchParam);
    }, [alngCategoryID,strSearchParam]);


    const fetchProductsData = async (strSearch?: string) => {
        let aObjData: typProduct[] = [];
        if (alngCategoryID.length > 0) {
            aObjData = await getProductByCategory(alngCategoryID);
        }
        else if (strSearch !== "" && strSearch !== undefined) {
            const aObjProducts = await getProduct();
            aObjData = aObjProducts.filter((product: typProduct) =>
                product.title.toLowerCase().includes(strSearch.toLowerCase()) ||
                product.description.toLowerCase().includes(strSearch.toLowerCase())
            );
            if (aObjData.length === 0) {
                navigation.navigate('ShoppingNavigator', { screen: 'NoResultSearch' });
            }
        }
        else if ((strSearch == "" || strSearch == undefined) && alngCategoryID.length === 0) {
            aObjData = await getProduct();
        }
        if (intMinPrice != 0 || intMaxPrice != 0) {
            aObjData = await getProducByRangePrice(aObjData, intMinPrice, intMaxPrice)
        }
        if (intMinRating != 0 || intMaxRating != 0) {
            aObjData = await getProducByRangeRating(aObjData, intMinRating, intMaxRating)
        }

        const sectionData = { title: 'All Products', data: [aObjData] };
        setSections([sectionData]);        
    };

    const renderRow = useCallback(
        ({ item }: { item: typProduct[] }) => (
            <View style={Styles.productContainer}>
                {item.map((product, index) => (
                    <Product key={index} product={product} />
                ))}
            </View>
        ),
        [],
    );

    return (
        <View style={Styles.wall}>
            <TouchableOpacity style={Styles.filterContainer}
                onPress={() => { navigation.navigate('ShoppingNavigator', { screen: 'Filter',params:{ screenName:props.route.name} }); }}>
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
