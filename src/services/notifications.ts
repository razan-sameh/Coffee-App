import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import {serverURL} from '../../App';

// Ask user for permission

async function requestNotificationPermissionAndroid13() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // Older Android versions don't need it
}

export async function requestUserPermission() {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      return;
    }
  } else {
    const granted = await requestNotificationPermissionAndroid13();
    if (!granted) {
      return;
    }
  }

  await saveFcmTokenToRealtimeDB();
}

// Get FCM token
async function saveFcmTokenToRealtimeDB() {
  const token = await messaging().getToken();
  const uid = auth().currentUser?.uid;

  if (!uid || !token) {
    return;
  }

  await fetch(`${serverURL}/api/user/update-fcm-token`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({uid, fcmToken: token}),
  });
}

export const listenToForegroundMessages = (
  onMessageCallback: (msg: any) => void,
): (() => void) => {
  if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
    console.warn('🚫 Firebase messaging not supported on this platform.');
    return () => {};
  }

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    onMessageCallback(remoteMessage);
    ToastAndroid.showWithGravity(
      `${remoteMessage.notification?.title} \n ${remoteMessage.notification?.body} `,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  });

  return unsubscribe;
};
