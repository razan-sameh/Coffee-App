import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, SectionList, View } from 'react-native';
import { Styles } from '../styles/Shopping';
import { Header } from '../Components/Header';
import { typProduct } from '../Content/Types';
import { Product } from '../Components/Product';
import { getProduct } from '../Content/Firebase';
import { getProductByCategory } from '../Content/Utils';
import { useFocusEffect } from '@react-navigation/native';

export function Shopping({ ...props }: any) {
    const [sections, setSections] = useState<{ title: string, data: typProduct[][] }[]>([]);
    const objListRef = useRef<SectionList>(null);
    const [lngCategoryID, setSelectedCatIndex] = useState<any>(undefined);


    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedCatIndex(undefined);
            };
        }, [])
    );

    useEffect(() => {
        setSelectedCatIndex(undefined);
        fetchProductsData()
    }, []);

    useEffect(() => {
        console.log('route', props.route.params);
        if (props.route.params?.categoryID !== undefined) {
            setSelectedCatIndex(props.route.params.categoryID);
        } else {
            setSelectedCatIndex(undefined);
        }
        return () => {
            setSections([]);
            setSelectedCatIndex(undefined);
        };
    }, [props.route.params]);

    useEffect(() => {
        setSelectedCatIndex(undefined);
        return () => {
            setSections([]);
            setSelectedCatIndex(undefined);
        };
    }, [props.categoryID]);

    useEffect(() => {
        fetchProductsData(props.route.params?.strSearch);
    }, [lngCategoryID, props.route.params]);



    const fetchProductsData = async (strSearch?:string) => {
        let aObjData: typProduct[] = [];
        if (lngCategoryID !== undefined) {
            aObjData = await getProductByCategory(lngCategoryID);
        }
        else if (strSearch !== "" && strSearch !== undefined) {            
            aObjData = await getProduct();
            console.log('searchQuery in shopping', strSearch);
            aObjData = aObjData.filter(product =>
                product.title.toLowerCase().includes(strSearch.toLowerCase()) ||
                product.description.toLowerCase().includes(strSearch.toLowerCase())
            );
            if (aObjData.length === 0) {
                console.log('not found NoResultSearch');
                props.navigation.navigate('NoResultSearch'); 

            }
        }
        else{
            console.log('innnnnnnn empty');
            aObjData = await getProduct();
        }
        // console.log('aObjData', aObjData);

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
