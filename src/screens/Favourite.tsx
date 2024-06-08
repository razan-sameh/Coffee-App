import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, SectionList, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '../styles/Favourite';
import { typProduct } from '../Content/Types';
import { Product } from '../Components/Product';
import { getProductByID } from '../Content/Utils';
import { getUserID } from '../Content/Authentication';
import database from '@react-native-firebase/database';
import FastImage from 'react-native-fast-image';
import { images } from '../Content/resources';
import { ArrowBack } from '../Components/ArrowBack';

export function Favourite({ ...props }: any) {
    const [sections, setSections] = useState<{ title: string, data: typProduct[][] }[]>([]);
    const objListRef = useRef<SectionList>(null);
    const strUserID = getUserID();
    
    useEffect(() => {
        if (strUserID) {
            database().ref(`favourite/${strUserID}`).on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const aintProductsID = snapshot.val().Products;
                    if (aintProductsID != undefined) {
                        fetchFavouriteProducts(aintProductsID);
                    }
                    else {
                        setSections([])
                    }
                }
            });
        }
    }, []);

    const fetchFavouriteProducts = async (ProductIDs: number[]) => {
        let aObjData: typProduct[] = [];
        aObjData = await getProductByID(ProductIDs);
        console.log('aObjData', aObjData);
        const sectionData = { title: 'Favourite Products', data: [aObjData] };
        setSections([sectionData]);
    };

    const renderRow = useCallback(
        ({ item }: { item: typProduct[] }) => (
            <View style={Styles.productContainer}>
                {item.map((product, index) => (
                    <Product key={index} product={product} navigation={props.navigation} />
                ))}
            </View>
        ),
        [],
    );
    return (
        <View style={Styles.wall}>
            <View style={Styles.backArrowContainer}>
                <ArrowBack />
            </View>
            {sections.length <= 0 ? (
                <View style={Styles.noDataContainer}>
                    <Text style={Styles.noDataText}>There is no favourite items</Text>
                </View>
            ) : (
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
            )}
        </View>
    );
}
