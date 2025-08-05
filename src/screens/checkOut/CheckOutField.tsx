import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {Styles} from '../../styles/CheckOut';
import {strPrimaryColor} from '../../styles/responsive';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  userValues?: string[];
  isAdding: boolean;
  setIsAdding: (val: boolean) => void;
  saveValue: boolean;
  setSaveValue: (val: boolean) => void;
  hasError: boolean;
  errorMessage: string;
  showSaveCheckbox?: boolean;
}

const CheckOutField: React.FC<Props> = ({
  label,
  placeholder,
  value,
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
}) => {
  const showPicker = userValues && userValues.length > 0 && !isAdding;

  return (
    <>
      <Text style={Styles.txtInputTitle}>{label}</Text>
      {showPicker ? (
        <View style={Styles.pickerContainer}>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}>
            {userValues.map((item, idx) => (
              <Picker.Item key={idx} label={item} value={item} />
            ))}
          </Picker>
        </View>
      ) : (
        <TextInput
          style={Styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A19D9D"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          underlineStyle={{display: 'none'}}
        />
      )}
      {hasError && <Text style={Styles.txtError}>{errorMessage}</Text>}

      {showSaveCheckbox && (
        <View style={Styles.checkboxContainer}>
          <CheckBox
            value={saveValue}
            onValueChange={setSaveValue}
            tintColors={{true: strPrimaryColor, false: strPrimaryColor}}
          />
          <Text style={Styles.txtRemember}>Save {label}</Text>
        </View>
      )}
      {showPicker && (
        <TouchableWithoutFeedback onPress={() => setIsAdding(true)}>
          <View style={Styles.addContainer}>
            <Text style={Styles.txtAdd}>Add {label}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}

      {isAdding && userValues && userValues?.length > 0 && (
        <TouchableWithoutFeedback onPress={() => setIsAdding(false)}>
          <Text style={Styles.txtAdd}>Cancel</Text>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default CheckOutField;
