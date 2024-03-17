import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Styles } from '../styles/Filter';
import RangeSlider from 'rn-range-slider';
import RailSelected from '../Components/RangeSlider/RailSelected';
import Rail from '../Components/RangeSlider/Rail';
import Thumb from '../Components/RangeSlider/Thumb';
import { typCategory, typPriceRange } from '../Content/Types';
import { getCategory, getMinAndMaxPrice } from '../Content/Firebase';
import FastImage from 'react-native-fast-image';
import { images } from '../Content/resources';

export function Filter({navigation}: any) {
    const [rangeDisabled, setRangeDisabled] = useState(false);
    const [low, setLow] = useState<number>(0);
    const [high, setHigh] = useState<number>(100);
    const [tpvPriceRange, setPriceRange] = useState<typPriceRange>({
        intMin: low,
        intMax: high
    });
    const [floatingLabel, setFloatingLabel] = useState(false);
    const renderThumb = useCallback(() => <Thumb />, [],);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const handleValueChange = useCallback((lowValue: number, highValue: number) => {
        setLow(lowValue);
        setHigh(highValue);
    }, []);
    const [aobjCategories, setCategory] = useState<typCategory[]>([]);
    const [alngCategoryID, setSelectedCategoryID] = useState<number[]>([]);

    const fetchCategoryData = async () => {
        const aobjCategories: typCategory[] = await getCategory();
        setCategory(aobjCategories)
    }
    const fetchMinandMaxPrice = async () => {
        const tpvPriceRange: typPriceRange = await getMinAndMaxPrice();
        setPriceRange(tpvPriceRange)
    }
    useEffect(() => {
        fetchCategoryData();
        fetchMinandMaxPrice();
    }, []);

    const toggleCategorySelection = (categoryId: number) => {
        setSelectedCategoryID(prevSelectedCategories => {
            if (prevSelectedCategories.includes(categoryId)) {
                return prevSelectedCategories.filter(id => id !== categoryId);
            } else {
                return [...prevSelectedCategories, categoryId];
            }
        });
    };

    return (
        <View style={Styles.wall}>
            <View style={Styles.backArrowContainer}>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigation.navigate('ShoppingNavigator', {
                        screen: 'Shopping',
                        params: { categoryID: alngCategoryID, intMinPrice: low,intMaxPrice:high }
                    })
                }}>
                    <FastImage style={Styles.arrowBackIcon} resizeMode='contain' source={images.ArrowBack}/>
                </TouchableWithoutFeedback>
                <Text style={Styles.txtTitle}>Filter</Text>
            </View>
            <View style={Styles.priceContainer}>
                <Text style={Styles.txtSubTitle}>Price Range</Text>
                <View style={Styles.priceSubContainer}>
                    <Text style={Styles.txtPriceNumber}>${low}</Text>
                    <Text style={Styles.txtPriceNumber}>${high}</Text>
                </View>
                <RangeSlider
                    style={Styles.slider}
                    min={tpvPriceRange.intMin}
                    max={tpvPriceRange.intMax}
                    step={0.5}
                    disableRange={rangeDisabled}
                    floatingLabel={floatingLabel}
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    onValueChanged={handleValueChange}
                />
            </View>
            <Text style={Styles.txtSubTitle}>Category</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles.catContainer}
            >
                {aobjCategories.map((category: typCategory, index) => {
                    const isSelected = alngCategoryID.includes(category.ID);
                    return (
                        <TouchableWithoutFeedback
                            key={category.ID}
                            onPress={() => {
                                toggleCategorySelection(category.ID)
                            }}
                        >
                            <View style={[Styles.catItem, isSelected ? Styles.selectedCatItem : null]}>
                                <Text style={[Styles.txtCat, isSelected ? Styles.selectedtextCat : null]}>{category.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        </View>
    );
}