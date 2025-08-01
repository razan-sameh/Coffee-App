import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ToastAndroid} from 'react-native';
import {addUser, getUserInfo, updateUserPassword} from './Database';
import {typLogin, typSignUp} from './Types';

GoogleSignin.configure({
  webClientId:
    '24598469643-697jcmilfshc905sk5jnl602tst5qtve.apps.googleusercontent.com',
});

export async function signinWithGoogle() {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // Get the user's ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    const user = userCredential.user;
    const userID = user.uid;

    const existingUser = await getUserInfo(userID);
    if (!existingUser) {
      const fullName = user.displayName || '';
      const email = user.email || '';

      // Save to database
      addUser(userID, fullName, email, ''); // Empty password since it's Google sign-in
    }

    console.log('You are signed in successfully');
  } catch (error) {
    console.log('Google sign-in error:', error);
    showToast('Google sign-in failed.');
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
      const fullName = data.strFirstName + data.strLastName;
      addUser(userID, fullName, data.strEmail, data.strPassword);
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
      const user = await getUserInfo(userID);
      callbacks.onSuccess(userID);

      // Optional comparison logic
      if (callbacks.comparePassword && user.password !== data.strPassword) {
        await updateUserPassword(userID, data.strPassword);
        callbacks.comparePassword(data.strPassword);
      }
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

export function logOut() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}
