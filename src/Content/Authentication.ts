import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ToastAndroid} from 'react-native';
import {typLogin, typSignUp} from './Types';
import {addUserAsync, fetchUserInfo} from '../redux/slices/userSlice';
import {store} from '../redux/store';

GoogleSignin.configure({
  webClientId:
    '24598469643-697jcmilfshc905sk5jnl602tst5qtve.apps.googleusercontent.com',
});

export async function signinWithGoogle(): Promise<boolean> {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);

    const user = userCredential.user;
    const userID = user.uid;
    const fullName = user.displayName || '';
    const email = user.email || '';

    const existingUser = await store.dispatch(fetchUserInfo(userID)).unwrap();

    if (!existingUser) {
      await store.dispatch(
        addUserAsync({
          Uid: userID,
          firstName: fullName.split(' ')[0],
          lastName: fullName.split(' ')[1],
          email,
          password: '',
        }),
      );
    }

    console.log('You are signed in successfully');
    return true;
  } catch (error) {
    console.log('Google sign-in error:', error);
    showToast('Google sign-in failed.');
    return false;
  }
}

export const createAccountWithEmail = async (
  data: typSignUp,
  onSuccess: () => void,
  onError: () => void,
) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(
      data.strEmail,
      data.strPassword,
    );
    await res.user.updateProfile({
      displayName: data.strFirstName + data.strLastName,
    });

    const userID = getUserID();
    if (userID) {
      store.dispatch(
        addUserAsync({
          Uid: userID,
          firstName: data.strFirstName,
          lastName: data.strLastName,
          email: data.strEmail,
          password: data.strPassword, // or provide actual password
        }),
      );
    }

    onSuccess();
  } catch (error: any) {
    onError();

    if (error.code === 'auth/email-already-in-use') {
      showToast('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      showToast('That email address is invalid!');
    } else {
      showToast('Authentication failed.');
    }
  }
};

export const signInWithEmail = async (
  data: typLogin,
  callbacks: {
    onSuccess: (userID: string) => void;
    onError: () => void;
    comparePassword?: (savedPassword: string) => void;
  },
) => {
  try {
    await auth().signInWithEmailAndPassword(data.strEmail, data.strPassword);

    const userID = getUserID();
    if (userID) {
      callbacks.onSuccess(userID);
    }
  } catch (error: any) {
    callbacks.onError();

    if (error.code === 'auth/invalid-credential') {
      showToast('The account or password is not correct!');
    } else {
      showToast('Authentication failed.');
    }
  }
};

const showToast = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export function getUserName() {
  return auth().currentUser?.displayName;
}
export function getUserID() {
  return auth().currentUser?.uid;
}

export async function logOut() {
  await GoogleSignin.signOut();
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}
