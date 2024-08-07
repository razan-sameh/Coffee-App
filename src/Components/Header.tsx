import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Styles } from '../styles/Header';
import { strInpitColor } from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import { images } from '../Content/resources';
import { getUserName, logOut } from '../Content/Authentication';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export function Header({ navigation, searchQuery, setSearchQuery }: any) {
    const navigationTo : NavigationProp<ParamListBase>= useNavigation();

    const executeSearch = () => {
        navigationTo.navigate('ShoppingNavigator', {
            screen: 'Shopping',
            params: { strSearch: searchQuery }
        })
    }

    return (
        <View style={Styles.mainContainer}>
            <TouchableOpacity onPress={() =>  navigation.openDrawer()}>
                <FastImage resizeMode='contain' style={Styles.sideBarImage} source={images.SideBarBtn} />
            </TouchableOpacity>
            <View style={Styles.locationContainer}>
                <FastImage resizeMode='contain' style={Styles.locationIcon} source={images.LocationIcon} />
                <View style={Styles.listLocationContainer}>
                    <Text style={Styles.txtlocation}>Egypt</Text>
                    <TouchableWithoutFeedback>
                        <FastImage resizeMode='contain' style={Styles.arrowDownLocation} source={images.ArrowDownLocation} />
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
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>
                <TouchableOpacity onPress={executeSearch}>
                    <FastImage resizeMode='contain' style={Styles.srchIcon} source={images.SrcIcon} />
                </TouchableOpacity >
            </View>
        </View>
    );
}
