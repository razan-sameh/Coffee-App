import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {Styles} from '../styles/Header';
import {strInpitColor} from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import {images} from '../Content/resources';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {resetFilters, setSearch} from '../redux/slices/filterSlice';
import {useDispatch} from 'react-redux';
import {getUserName} from '../services/Authentication';

export function Header({navigation, searchQuery, setSearchQuery}: any) {
  const navigationTo: NavigationProp<ParamListBase> = useNavigation();

  const dispatch = useDispatch();

  const executeSearch = () => {
    dispatch(resetFilters());
    dispatch(setSearch(searchQuery)); // update filter in Redux
    navigationTo.navigate('ShoppingNavigator', {
      screen: 'Shopping',
    });
  };

  return (
    <View style={Styles.mainContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <FastImage
          resizeMode="contain"
          style={Styles.sideBarImage}
          source={images.SideBarBtn}
        />
      </TouchableOpacity>
      <View style={Styles.locationContainer}>
        <FastImage
          resizeMode="contain"
          style={Styles.locationIcon}
          source={images.LocationIcon}
        />
        <View style={Styles.listLocationContainer}>
          <Text style={Styles.txtlocation}>Egypt</Text>
          <TouchableWithoutFeedback>
            <FastImage
              resizeMode="contain"
              style={Styles.arrowDownLocation}
              source={images.ArrowDownLocation}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Text style={Styles.txtuserName}>Good Morning, {getUserName()}</Text>
      <View style={Styles.searchContainer}>
        <View style={Styles.srchInputContainer}>
          <TextInput
            style={Styles.srchInput}
            placeholder="Search"
            placeholderTextColor={strInpitColor}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
        <TouchableOpacity onPress={executeSearch}>
          <FastImage
            resizeMode="contain"
            style={Styles.srchIcon}
            source={images.SrcIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
