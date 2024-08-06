import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Styles } from '../styles/Filter';
import RangeSlider from 'rn-range-slider';
import RailSelected from '../Components/RangeSlider/RailSelected';
import Rail from '../Components/RangeSlider/Rail';
import Thumb from '../Components/RangeSlider/Thumb';
import { typCategory, typRange } from '../Content/Types';
import { getCategory, getMinAndMaxPrice } from '../Content/Database';
import { ArrowBack } from '../Components/ArrowBack';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export function Filter({...props }: any) {
    const navigation : NavigationProp<ParamListBase>= useNavigation();
    const [aobjCategories, setCategory] = useState<typCategory[]>([]);
    const [alngCategoryID, setSelectedCategoryID] = useState<number[]>([]);
    const [lowPrice, setLowPrice] = useState<number>(0);
    const [highPrice, setHighPrice] = useState<number>(100);
    const [tpvPriceRange, setPriceRange] = useState<typRange>({
        intMin: lowPrice,
        intMax: highPrice
    });
    const screenNameApplyOn = props.navigation.route.params.screenName
    const [lowRating, setLowRating] = useState<number>(1);
    const [highRating, setHighRating] = useState<number>(5);
    const [tpvRatingRange, setRatingRange] = useState<typRange>({
        intMin: lowRating,
        intMax: highRating
    });
    const renderThumb = useCallback(() => <Thumb />, [],);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);

    const handlePriceChange = useCallback((lowValue: number, highValue: number) => {
        setLowPrice(lowValue);
        setHighPrice(highValue);
    }, []);

    const handleRatingChange = useCallback((lowValue: number, highValue: number) => {
        setLowRating(lowValue);
        setHighRating(highValue);
    }, []);

    const fetchCategoryData = async () => {
        const aobjCategories: typCategory[] = await getCategory();
        setCategory(aobjCategories)
    }
    const fetchMinandMaxPrice = async () => {
        const tpvPriceRange: typRange = await getMinAndMaxPrice();
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
                <ArrowBack />
            </View>
            <View style={Styles.headerContainer}>
                <Text style={Styles.txtTitle}>Filter</Text>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                style={Styles.mainContainer}
            >
                <View style={Styles.rangeContainer}>
                    <Text style={Styles.txtRangeTitle}>Price</Text>
                    <View style={Styles.dataRangeContainer}>
                        <Text style={Styles.txtData}>${lowPrice}</Text>
                        <Text style={Styles.txtData}>${highPrice}</Text>
                    </View>
                    <RangeSlider
                        style={Styles.slider}
                        min={tpvPriceRange.intMin}
                        max={tpvPriceRange.intMax}
                        step={0.5}
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        onValueChanged={handlePriceChange}
                    />
                </View>
                <View style={Styles.rangeContainer}>
                    <Text style={Styles.txtRangeTitle}>Rating</Text>
                    <View style={Styles.dataRangeContainer}>
                        <Text style={Styles.txtData}>{lowRating} star</Text>
                        <Text style={Styles.txtData}>{highRating} star</Text>
                    </View>
                    <RangeSlider
                        style={Styles.slider}
                        min={tpvRatingRange.intMin}
                        max={tpvRatingRange.intMax}
                        step={1}
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        onValueChanged={handleRatingChange}
                    />
                </View>
                <Text style={Styles.txtRangeTitle}>Category</Text>
                <View
                    style={Styles.catContainer}
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
                </View>
            </ScrollView>
            <View style={Styles.applyBtnContainer}>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate(screenNameApplyOn, 
                        // screen: screenNameApplyOn
                        { categoryID: alngCategoryID, intMinPrice: lowPrice, intMaxPrice: highPrice,intMinRating:lowRating,intMaxRating:highRating }
                    )
                }}>
                    <View style={Styles.applyBtn}>
                        <Text style={Styles.txtApply}>Apply Filter</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}