/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Styles} from '../CheckOutStyle';
import {strPrimaryColor} from '../../../styles/responsive';

interface Props {
  label: string;
  showSaveCheckbox?: boolean;
  saveValue: boolean;
  setSaveValue: (val: boolean) => void;
  userValues?: any[];
  isAdding: boolean;
  setIsAdding: (val: boolean) => void;
}

const SaveOptionsRow = ({
  label,
  showSaveCheckbox = true,
  saveValue,
  setSaveValue,
  userValues,
  isAdding,
  setIsAdding,
}: Props) => {
  return (
    <>
      {!isAdding && (userValues?.length ?? 0) > 0 && (
        <TouchableWithoutFeedback onPress={() => setIsAdding(true)}>
          <View style={Styles.addContainer}>
            <Text style={Styles.txtAdd}>Add {label}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}

      {(isAdding || (userValues?.length ?? 0) === 0) && (
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
          {(userValues?.length ?? 0) > 0 && (
            <TouchableWithoutFeedback onPress={() => setIsAdding(false)}>
              <Text style={Styles.txtAdd}>Cancel</Text>
            </TouchableWithoutFeedback>
          )}
        </View>
      )}
    </>
  );
};

export default SaveOptionsRow;
