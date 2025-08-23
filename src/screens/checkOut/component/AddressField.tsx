import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {typLocation} from '../../../Content/Types';
import {formatLocation} from '../../../Content/Utils';
import {Styles} from '../CheckOutStyle';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

interface Props {
  value?: typLocation;
  savedAddresses?: typLocation[];
  hasError?: boolean;
  errorMessage?: string;
  isAdding: boolean;
}

const AddressField = ({
  value,
  savedAddresses,
  hasError,
  errorMessage,
  isAdding,
}: Props) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  if (savedAddresses && savedAddresses.length > 0 && !isAdding) {
    return (
      <View>
        <View style={Styles.pickerContainer}>
          <Picker
            selectedValue={value}
            onValueChange={val => (value ? (value as any) : val)}>
            {savedAddresses.map((addr, idx) => (
              <Picker.Item
                key={idx}
                label={formatLocation(addr)}
                value={addr}
              />
            ))}
          </Picker>
        </View>
        {hasError && <Text style={Styles.txtError}>{errorMessage}</Text>}
      </View>
    );
  }

  // Otherwise, navigate to LocationPicker
  return (
    <View style={{marginVertical: 10}}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('LocationPicker')}>
        <View style={Styles.btnLocation}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            {value ? 'Change Location' : 'Pick Location'}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {value?.address && (
        <Text style={{marginTop: 5, color: '#fff'}}>
          📍 {formatLocation(value.address)}
        </Text>
      )}

      {hasError && <Text style={Styles.txtError}>{errorMessage}</Text>}
    </View>
  );
};

export default AddressField;
