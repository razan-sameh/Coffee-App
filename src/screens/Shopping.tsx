import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, SectionList, View } from 'react-native';
import { Styles } from '../styles/Shopping';
import { typProduct } from '../Content/Types';
import { Product } from '../Components/Product';
import { getProduct } from '../Content/Firebase';
import { getProducByRangePrice, getProductByCategory } from '../Content/Utils';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '../Content/resources';
import FastImage from 'react-native-fast-image';

export function Shopping({ ...props }: any) {
    const [sections, setSections] = useState<{ title: string, data: typProduct[][] }[]>([]);
    const objListRef = useRef<SectionList>(null);
    const [alngCategoryID, setSelectedCategoryID] = useState<number[]>([]);
    const [intMinPrice, setMinPrice] = useState<number>(0);
    const [intMaxPrice, setMaxPrice] = useState<number>(100);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedCategoryID([]);
                setSections([]);
                setMinPrice(0);
                setMaxPrice(100);
            };
        }, [])
    );


    useEffect(() => {
        setMinPrice(props.route.params?.intMinPrice)
        setMaxPrice(props.route.params?.intMaxPrice)
    }, [props.route.params?.intMinPrice , props.route.params?.intMaxPrice]);

    useEffect(() => {
        if (props.route.params?.categoryID !== undefined) {
            if (typeof props.route.params?.categoryID == 'object') {
                props.route.params?.categoryID.map((item: number) => {
                    setSelectedCategoryID(prevState => [...prevState, item]);
                })
            }
            else {
                setSelectedCategoryID([props.route.params?.categoryID])
            }
        }
        return () => {
            setSections([]);
            setSelectedCategoryID([]);
        };
    }, [props.route.params]);

    useEffect(() => {
        fetchProductsData(props.route.params?.strSearch);
    }, [alngCategoryID]);


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
                props.navigation.navigate('ShoppingNavigator', { screen: 'NoResultSearch' });
            }
        }
        else if ((strSearch == "" || strSearch == undefined) && alngCategoryID.length === 0) {
            aObjData = await getProduct();
        }
        if (intMinPrice != 0 || intMaxPrice != 100 ){            
            aObjData = await getProducByRangePrice(aObjData,intMinPrice,intMaxPrice)
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
                <FastImage resizeMode='contain' style={Styles.filterIcon} source={images.FilterIcon}/>
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
