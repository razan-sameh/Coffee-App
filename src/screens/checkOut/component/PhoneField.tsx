import React, {forwardRef} from 'react';
import {View, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {typPhone} from '../../../Content/Types';
import {Styles} from '../CheckOutStyle';
import {Picker} from '@react-native-picker/picker';

interface Props {
  value?: typPhone;
  onChange?: (val: typPhone) => void;
  savedPhones?: typPhone[];
  hasError?: boolean;
  errorMessage?: string;
  isAdding: boolean;
}

const PhoneField = forwardRef<PhoneInput, Props>(
  ({value, onChange, savedPhones, hasError, errorMessage, isAdding}, ref) => {
    // If there are saved phones and user is not adding new one, show Picker
    if (savedPhones && savedPhones.length > 0 && !isAdding) {
      return (
        <View>
          <View style={Styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={val => onChange?.(val as typPhone)}>
              {savedPhones.map((p, idx) => (
                <Picker.Item
                  key={idx}
                  label={`${p.countryCode} ${p.number}`}
                  value={p}
                />
              ))}
            </Picker>
          </View>
        </View>
      );
    }

    // Otherwise, show PhoneInput
    return (
      <View>
        <PhoneInput
          ref={ref}
          defaultCode="EG"
          layout="first"
          containerStyle={Styles.input}
          textContainerStyle={{backgroundColor: 'white', borderRadius: 10}}
          onChangeFormattedText={text => {
            if (ref && 'current' in ref && ref.current) {
              const fullNumber = text; // e.g. +2131501098055
              const callingCode = ref.current.getCallingCode() || '';
              const numberWithoutCode = fullNumber.replace(
                `+${callingCode}`,
                '',
              ); // remove country code
              onChange?.({
                countryCode: `+${callingCode}`,
                countryISO: ref.current.getCountryCode() || '',
                number: numberWithoutCode, // ✅ only the number part
              });
            }
          }}
        />

        {hasError && <Text style={Styles.txtError}>{errorMessage}</Text>}
      </View>
    );
  },
);

export default PhoneField;
