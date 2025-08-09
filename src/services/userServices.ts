import database from '@react-native-firebase/database';
import {typUser} from '../Content/Types';

// Fetch user data
export const getUserById = async (Uid: string): Promise<typUser> => {
  const snapshot = await database().ref(`/user/${Uid}`).once('value');
  return snapshot.val();
};

// Update user password
export const changeUserPassword = async (
  Uid: string,
  newPassword: string,
): Promise<void> => {
  const reference = database().ref(`/user/${Uid}`);
  await reference.update({password: newPassword});
};

// Add address and phone number
export const addUserDetailsToFirebase = async (
  Uid: string,
  address?: string,
  phoneNumber?: string,
): Promise<void> => {
  const userRef = database().ref(`user/${Uid}`);
  const snapshot = await userRef.once('value');

  if (snapshot.exists()) {
    const userData = snapshot.val();
    const addresses = userData.address ?? [];
    const phoneNumbers = userData.phoneNumber ?? [];

    if (!addresses.includes(address)) {
      addresses.push(address);
    }
    if (!phoneNumbers.includes(phoneNumber)) {
      phoneNumbers.push(phoneNumber);
    }

    await userRef.update({address: addresses, phoneNumber: phoneNumbers});
  } else {
    await userRef.set({
      address: [address],
      phoneNumber: [phoneNumber],
    });
  }
};
