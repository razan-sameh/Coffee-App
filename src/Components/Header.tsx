import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import SideBarBtn from '../assets/images/SideBarBtn';
import { Styles } from '../styles/Header';
import LocationIcon from '../assets/images/LocationIcon';
import ArrowDownLocation from '../assets/images/ArrowDownLocation';
import ExeSrchBtn from '../assets/images/ExeSrchBtn';
import SrcIcon from '../assets/images/SrcIcon';
import { strInpitColor } from '../styles/responsive';

export function Header({ navigation, searchQuery, setSearchQuery} :any) {

    const executeSearch = () => {
        navigation.navigate('ShoppingNavigator', {
            screen: 'Shopping',
            params:{ strSearch: searchQuery}
        })
        }
    return (
        <View style={Styles.mainContainer}>
            <TouchableOpacity>
                <SideBarBtn />
            </TouchableOpacity>
            <View style={Styles.locationContainer}>
                <LocationIcon />
                <View style={Styles.listLocationContainer}>
                    <Text style={Styles.txtlocation}>Egypt</Text>
                    <TouchableWithoutFeedback>
                        <ArrowDownLocation />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <Text style={Styles.txtuserName}>Good Morning, Shrouk</Text>
            <View style={Styles.searchContainer}>
                <View style={Styles.srchInputContainer}>
                    <SrcIcon />
                    <TextInput
                        style={Styles.srchInput}
                        placeholder="Search"
                        placeholderTextColor={strInpitColor}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>
                <TouchableOpacity onPress={executeSearch}>
                    <ExeSrchBtn />
                </TouchableOpacity >
            </View>
        </View>
    );
}
