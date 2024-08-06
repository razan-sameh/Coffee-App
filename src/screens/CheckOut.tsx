import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { images } from '../Content/resources';
import { Styles } from '../styles/CheckOut';
import { ArrowBack } from '../Components/ArrowBack';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { strPrimaryColor, strSecondColor } from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import { typCheckout } from '../Content/Types';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { addUserDetails, getAddressByUid, getPhoneNumberByUid } from '../Content/Database';
import { getUserID } from '../Content/Authentication';
import { Picker } from '@react-native-picker/picker';

const CheckOut = () => {
    const { control, handleSubmit: handleCheckOut, formState: { errors }, setValue } = useForm<typCheckout>({
        defaultValues: {
            strFullName: "",
            strPhoneNumber: '',
            strAddress: '',
        }
    })
    const [blnIsCheckOut, setIsCheckOut] = useState<boolean>(false);
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [isDataSaved, setIsDataSaved] = useState<boolean>(false);
    const [straAddress, setAddress] = useState<string[]>();
    const [isThereAddress, setIsThereAddress] = useState<boolean>(false);
    const [straPhone, setPhone] = useState<string[]>();
    const [isTherePhone, setIsTherePhone] = useState<boolean>(false);

    const onCheckOut = async (data: typCheckout) => {
        console.log('Submitted Data:', data);
        setIsCheckOut(true)
        try {
            if (isDataSaved) {
                const userID = getUserID();
                if (userID) {
                    await addUserDetails(userID, data.strAddress, data.strPhoneNumber)
                }
            }
            navigation.navigate('CartNavigator',
                {
                    screen: 'Payment',
                }
            )
        } catch (error) {
            console.log('Error', error);
        }
        setIsCheckOut(false)
    }

    const loadAddress = async () => {
        const userID = getUserID();
        if (userID) {
            const straAddress: string[] = await getAddressByUid(userID)
            setAddress(straAddress);
            if (straAddress.length > 0) {
                setIsThereAddress(true)
                setValue('strAddress', straAddress[0]);
            }
        }
    }

    const loadPhoneData = async () => {
        const userID = getUserID();
        if (userID) {
            const straPhone: string[] = await getPhoneNumberByUid(userID)
            setPhone(straPhone)
            if (straPhone.length > 0) {
                setIsTherePhone(true)
                setValue('strPhoneNumber', straPhone[0]);
            }
        }
    }

    useEffect(() => {
        loadAddress()
        loadPhoneData()
    }, [])

    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.backArrowContainer}>
                <ArrowBack />
                <Text style={Styles.txtTitle}>CheckOut</Text>
            </View>
            <FastImage style={Styles.wave} resizeMode='contain' source={images.WallWave} />
            <FastImage style={Styles.wallCoffeeImage1} resizeMode='contain' source={images.LoginWallIcon1} />
            <FastImage style={Styles.wallCoffeeImage2} resizeMode='contain' source={images.LoginWallIcon2} />
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
                <Controller
                    control={control}
                    name="strFullName"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Text style={Styles.txtInputTitle}>Full Name</Text>
                            <TextInput
                                style={Styles.input}
                                textContentType='name'
                                placeholderTextColor={'#A19D9D'}
                                placeholder="Your Full Name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                underlineStyle={{ display: 'none' }}
                            />
                        </View>
                    )}
                />
                {errors.strFullName && errors.strFullName.type === 'required' && <Text style={Styles.txtError}>This is required.</Text>}
                <Controller
                    control={control}
                    name="strPhoneNumber"
                    rules={{
                        pattern: /^(01[0125][0-9]{8}|0[2-9][0-9]{8})$/,
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Text style={Styles.txtInputTitle}>Phone Number</Text>
                            {isTherePhone ?
                                <View style={Styles.pickerContainer}>
                                    <Picker
                                        selectedValue={value}
                                        placeholder='Choose Address'
                                        onValueChange={onChange}
                                        onBlur={onBlur}
                                    >
                                        {
                                            straPhone?.map((address, index) => (
                                                <Picker.Item
                                                    key={index}
                                                    label={address}
                                                    value={address}
                                                />
                                            ))
                                        }
                                    </Picker>
                                </View>
                                :
                                <TextInput
                                    style={Styles.input}
                                    textContentType='telephoneNumber'
                                    placeholder="Phone Number"
                                    placeholderTextColor={'#A19D9D'}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    underlineStyle={{ display: 'none' }}
                                />
                            }
                        </View>
                    )}
                />
                {!isTherePhone &&
                    errors.strPhoneNumber && errors.strPhoneNumber.type === 'pattern' && <Text style={Styles.txtError}>The Phone Number must be 11 number.</Text> &&
                    errors.strPhoneNumber && errors.strPhoneNumber.type === 'required' && <Text style={Styles.txtError}>This is required.</Text>
                }
                <TouchableWithoutFeedback onPress={() => setIsTherePhone(false)}>
                    <View style={Styles.addContainer}>
                        <Text style={Styles.txtAdd}>Add Phone Number</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Controller
                    control={control}
                    name="strAddress"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Text style={Styles.txtInputTitle}>Address</Text>
                            {isThereAddress ?
                                <View style={Styles.pickerContainer}>
                                    <Picker
                                        selectedValue={value}
                                        placeholder='Choose Address'
                                        onValueChange={onChange}
                                        onBlur={onBlur}
                                    >
                                        {
                                            straAddress?.map((address, index) => (
                                                <Picker.Item
                                                    key={index}
                                                    label={address}
                                                    value={address}
                                                />
                                            ))
                                        }
                                    </Picker>
                                </View>
                                :
                                <TextInput
                                    style={Styles.input}
                                    textContentType='streetAddressLine1'
                                    placeholderTextColor={'#A19D9D'}
                                    placeholder="Address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    underlineStyle={{ display: 'none' }}
                                />
                            }
                        </View>
                    )}
                />
                {!isThereAddress &&
                    errors.strAddress && errors.strAddress.type === 'required' && <Text style={Styles.txtError}>This is required.</Text>
                }
                <View style={Styles.footerContainer}>
                    <View style={Styles.checkboxContainer}>
                        <CheckBox
                            value={isDataSaved}
                            onValueChange={setIsDataSaved}
                            tintColors={{ true: strPrimaryColor, false: strPrimaryColor }}
                        />
                        <Text style={Styles.txtRemember}>Save Data</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setIsThereAddress(false)}>
                        <Text style={Styles.txtAdd}>Add Address</Text>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={handleCheckOut(onCheckOut)} >
                    <View style={Styles.btnSubmitContainer}>
                        {
                            blnIsCheckOut ?
                                <ActivityIndicator size={20} color={strSecondColor} />
                                :
                                <Text style={Styles.txtButtonSubmit}>
                                    Payment
                                </Text>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}
export default CheckOut;

