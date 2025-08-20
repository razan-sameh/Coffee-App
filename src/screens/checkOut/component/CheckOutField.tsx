/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {Styles} from '../CheckOutStyle';
import {strPrimaryColor, strWhiteColor} from '../../../styles/responsive';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {typLocation} from '../../../Content/Types';
import {formatLocation} from '../../../Content/Utils';

interface Props {
  label: string;
  placeholder: string;
  value?: string | typLocation;
  onChange?: (val: string) => void;
  onBlur?: () => void;
  userValues?: (string | typLocation)[];
  isAdding: boolean;
  setIsAdding: (val: boolean) => void;
  saveValue: boolean;
  setSaveValue: (val: boolean) => void;
  hasError: boolean;
  errorMessage: string;
  showSaveCheckbox?: boolean;
  isAddress?: boolean;
}

const CheckOutField: React.FC<Props> = ({
  label,
  placeholder,
  value = '',
  onChange,
  onBlur,
  userValues,
  isAdding,
  setIsAdding,
  saveValue,
  setSaveValue,
  hasError,
  errorMessage,
  showSaveCheckbox = true,
  isAddress = false,
}) => {
  const showPicker = userValues && userValues.length > 0 && !isAdding;
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <>
      <Text style={Styles.txtInputTitle}>{label}</Text>

      {/* Case 1: Picker when saved values exist */}
      {showPicker ? (
        <View style={Styles.pickerContainer}>
          <Picker
            selectedValue={
              typeof value === 'string' ? value : formatLocation(value) // <-- use formatted address here
            }
            onValueChange={val => {
              onChange?.(val); // <- still passes string back
              if (!value) onBlur?.();
            }}>
            {userValues!.map((item, idx) => {
              const label =
                typeof item === 'string' ? item : formatLocation(item); // <-- formatted address
              const val =
                typeof item === 'string' ? item : formatLocation(item); // <-- formatted value for Picker
              return <Picker.Item key={idx} label={label} value={val} />;
            })}
          </Picker>
        </View>
      ) : isAddress ? (
        <View style={{marginVertical: 10}}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('LocationPicker')}>
            <View style={Styles.btnLocation}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                {value ? 'Change Location' : 'Pick Location'}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          {typeof value !== 'string' && value?.address && (
            <Text style={{marginTop: 5, color: strWhiteColor}}>
              📍 {formatLocation(value.address)}
            </Text>
          )}

          {hasError && <Text style={Styles.txtError}>{errorMessage}</Text>}
        </View>
      ) : (
        /* Case 3: Normal text input */
        <TextInput
          style={Styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A19D9D"
          onBlur={onBlur}
          onChangeText={val => onChange?.(val)} // safe call
          value={typeof value === 'string' ? value : value?.address?.road || ''}
          underlineStyle={{display: 'none'}}
        />
      )}

      {/* Validation error */}
      {hasError && <Text style={Styles.txtError}>{errorMessage}</Text>}

      {/* Show add button if picker */}
      {showPicker && (
        <TouchableWithoutFeedback onPress={() => setIsAdding(true)}>
          <View style={Styles.addContainer}>
            <Text style={Styles.txtAdd}>Add {label}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* Save/Cancel row */}
      {isAdding || !userValues?.length ? (
        <View
          style={[
            Styles.checkboxContainer,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          {showSaveCheckbox && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={saveValue}
                onValueChange={setSaveValue}
                tintColors={{true: strPrimaryColor, false: strPrimaryColor}}
              />
              <Text style={Styles.txtRemember}>Save {label}</Text>
            </View>
          )}
          {userValues && userValues.length > 0 && (
            <TouchableWithoutFeedback onPress={() => setIsAdding(false)}>
              <Text style={Styles.txtAdd}>Cancel</Text>
            </TouchableWithoutFeedback>
          )}
        </View>
      ) : null}
    </>
  );
};

export default CheckOutField;
