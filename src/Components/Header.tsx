import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Styles } from '../styles/Header';
import { strInpitColor } from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import { images } from '../Content/resources';
import auth from '@react-native-firebase/auth';

export function Header({ navigation, searchQuery, setSearchQuery }: any) {

    const executeSearch = () => {
        navigation.navigate('ShoppingNavigator', {
            screen: 'Shopping',
            params: { strSearch: searchQuery }
        })
    }

    function logOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    return (
        <View style={Styles.mainContainer}>
            <TouchableOpacity onPress={() => logOut()}>
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
            <Text style={Styles.txtuserName}>Good Morning, {auth().currentUser?.displayName}</Text>
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
