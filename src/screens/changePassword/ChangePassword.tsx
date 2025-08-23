import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {RootState, useAppDispatch} from '../../redux/store';
import {updateUserPassword} from '../../redux/slices/userSlice';
import {ArrowBack} from '../../Components/ArrowBack';
import {Styles} from './ChangePasswordStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {strPrimaryColor} from '../../styles/responsive';
import {useFocusEffect} from '@react-navigation/native';

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm<FormValues>();

  const dispatch = useAppDispatch();
  const {user} = useSelector((state: RootState) => state.user);

  // Local state for visibility toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Screen focused
      return () => {
        // Screen unfocused -> reset form
        reset();
      };
    }, [reset]),
  );

  const onSubmit = async (data: FormValues) => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser || !user) {
        Alert.alert('Error', 'No user is logged in');
        return;
      }

      const credential = auth.EmailAuthProvider.credential(
        currentUser.email ?? '',
        data.currentPassword,
      );
      await currentUser.reauthenticateWithCredential(credential);
      await currentUser.updatePassword(data.newPassword);

      await dispatch(
        updateUserPassword({Uid: user.Uid, newPassword: data.newPassword}),
      );
      ToastAndroid.show('Password changed successfully!', ToastAndroid.SHORT);
      reset();
    } catch (error: any) {
      console.error(error);
      ToastAndroid.showWithGravityAndOffset(
        `Failed to update password: ${error.message}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  return (
    <View style={Styles.wall}>
      <ArrowBack />
      <Text style={Styles.txtTitle}>Change Password</Text>

      {/* Current Password */}
      <View style={Styles.inputWrapper}>
        <Controller
          control={control}
          name="currentPassword"
          rules={{required: 'Current password is required'}}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={Styles.input}
              placeholder="Current Password"
              secureTextEntry={!showCurrent}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableWithoutFeedback onPress={() => setShowCurrent(!showCurrent)}>
          <View style={Styles.eyeIcon}>
            <Icon
              name={showCurrent ? 'eye' : 'eye-off'}
              size={22}
              color={strPrimaryColor}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {errors.currentPassword && (
        <Text style={Styles.errorText}>{errors.currentPassword.message}</Text>
      )}

      {/* New Password */}
      <View style={Styles.inputWrapper}>
        <Controller
          control={control}
          name="newPassword"
          rules={{
            required: 'New password is required',
            minLength: {value: 6, message: 'Password must be at least 6 chars'},
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={Styles.input}
              placeholder="New Password"
              secureTextEntry={!showNew}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableWithoutFeedback onPress={() => setShowNew(!showNew)}>
          <View style={Styles.eyeIcon}>
            <Icon
              name={showNew ? 'eye' : 'eye-off'}
              size={22}
              color={strPrimaryColor}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {errors.newPassword && (
        <Text style={Styles.errorText}>{errors.newPassword.message}</Text>
      )}

      {/* Confirm Password */}
      <View style={Styles.inputWrapper}>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirm password is required',
            validate: val =>
              val === watch('newPassword') || 'Passwords do not match',
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={Styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableWithoutFeedback onPress={() => setShowConfirm(!showConfirm)}>
          <View style={Styles.eyeIcon}>
            <Icon
              name={showConfirm ? 'eye' : 'eye-off'}
              size={22}
              color={strPrimaryColor}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {errors.confirmPassword && (
        <Text style={Styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={Styles.btnSubmitContainer}
        onPress={handleSubmit(onSubmit)}>
        <Text style={Styles.txtButtonSubmit}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}
