import React, {useCallback} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Styles} from '../styles/Filter';
import RangeSlider from 'rn-range-slider';
import RailSelected from '../Components/RangeSlider/RailSelected';
import Rail from '../Components/RangeSlider/Rail';
import Thumb from '../Components/RangeSlider/Thumb';
import {ArrowBack} from '../Components/ArrowBack';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  setPriceRange,
  setRatingRange,
  setCategoryID,
  resetFilters,
} from '../redux/slices/filterSlice';
import {useGetCategoriesQuery} from '../services/firebaseApi';

export function Filter() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  // ✅ Categories from RTK Query
  const {
    data: aobjCategories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategoriesQuery();

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  const handlePriceChange = useCallback(
    (low: number, high: number) => {
      dispatch(setPriceRange({min: low, max: high}));
    },
    [dispatch],
  );

  const handleRatingChange = useCallback(
    (low: number, high: number) => {
      dispatch(setRatingRange({min: low, max: high}));
    },
    [dispatch],
  );

  const toggleCategorySelection = (categoryId: number) => {
    const newSelection = filter.categoryID.includes(categoryId)
      ? filter.categoryID.filter(id => id !== categoryId)
      : [...filter.categoryID, categoryId];
    dispatch(setCategoryID(newSelection));
  };

  return (
    <View style={Styles.wall}>
      <View style={Styles.backArrowContainer}>
        <ArrowBack />
      </View>
      <View style={Styles.headerContainer}>
        <Text style={Styles.txtTitle}>Filter</Text>
      </View>
      <ScrollView style={Styles.mainContainer}>
        {/* Price Filter */}
        <View style={Styles.rangeContainer}>
          <Text style={Styles.txtRangeTitle}>Price</Text>
          <View style={Styles.dataRangeContainer}>
            <Text style={Styles.txtData}>${filter.intMinPrice}</Text>
            <Text style={Styles.txtData}>${filter.intMaxPrice}</Text>
          </View>
          <RangeSlider
            style={Styles.slider}
            min={filter.defaultPrice.min} // ✅ dynamic min
            max={filter.defaultPrice.max} // ✅ dynamic max
            step={0.5}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            onValueChanged={handlePriceChange}
            low={filter.intMinPrice}
            high={filter.intMaxPrice}
          />
        </View>

        {/* Rating Filter */}
        <View style={Styles.rangeContainer}>
          <Text style={Styles.txtRangeTitle}>Rating</Text>
          <View style={Styles.dataRangeContainer}>
            <Text style={Styles.txtData}>{filter.intMinRating} star</Text>
            <Text style={Styles.txtData}>{filter.intMaxRating} star</Text>
          </View>
          <RangeSlider
            style={Styles.slider}
            min={filter.defaultRating.min} // ✅ dynamic min
            max={filter.defaultRating.max} // ✅ dynamic max
            step={1}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            onValueChanged={handleRatingChange}
            low={filter.intMinRating}
            high={filter.intMaxRating}
          />
        </View>

        {/* Category Filter */}
        <Text style={Styles.txtRangeTitle}>Category</Text>
        <View style={Styles.catContainer}>
          {isLoadingCategories ? (
            <Text>Loading categories...</Text>
          ) : isErrorCategories ? (
            <Text>Failed to load categories.</Text>
          ) : (
            aobjCategories.map(category => {
              const categoryId = Number(category.ID);
              const isSelected = filter.categoryID.includes(categoryId);
              return (
                <TouchableWithoutFeedback
                  key={category.ID}
                  onPress={() => toggleCategorySelection(categoryId)}>
                  <View
                    style={[
                      Styles.catItem,
                      isSelected ? Styles.selectedCatItem : null,
                    ]}>
                    <Text
                      style={[
                        Styles.txtCat,
                        isSelected ? Styles.selectedtextCat : null,
                      ]}>
                      {category.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={Styles.applyBtnContainer}>
        <TouchableWithoutFeedback onPress={() => dispatch(resetFilters())}>
          <View
            style={[
              Styles.applyBtn,
              {backgroundColor: 'gray', marginRight: 10},
            ]}>
            <Text style={Styles.txtApply}>Reset</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={Styles.applyBtn}>
            <Text style={Styles.txtApply}>Apply Filter</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
