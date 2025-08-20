import database from '@react-native-firebase/database';
import {typLocation, typUser} from '../Content/Types';
import auth from '@react-native-firebase/auth';

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
type UpdateUserPayload = {
  Uid: string;
  firstName?: string;
  lastName?: string;
  address?: typLocation;
  phoneNumber?: string;
};

export const updateUserProfile = async ({
  Uid,
  firstName,
  lastName,
  address,
  phoneNumber,
}: UpdateUserPayload): Promise<void> => {
  const user = auth().currentUser;
  const updates: any = {};

  // Update Firebase Auth name
  if (user && (firstName || lastName)) {
    await user.updateProfile({
      displayName: `${firstName ?? ''} ${lastName ?? ''}`.trim(),
    });
    updates.firstName = firstName;
    updates.lastName = lastName;
  }

  // Handle phone/address
  const userRef = database().ref(`user/${Uid}`);
  const snapshot = await userRef.once('value');
  const userData = snapshot.val() ?? {};

  const addresses = userData.address ?? [];
  const phoneNumbers = userData.phoneNumber ?? [];

  if (address) {
    const alreadyExists = addresses.some(
      (a: typLocation) =>
        a?.latitude === address.latitude && a?.longitude === address.longitude,
    );
    if (!alreadyExists) addresses.push(address);
    updates.address = addresses;
  }

  if (phoneNumber) {
    if (!phoneNumbers.includes(phoneNumber)) {
      phoneNumbers.push(phoneNumber);
    }
    updates.phoneNumber = phoneNumbers;
  }

  if (Object.keys(updates).length > 0) {
    await userRef.update(updates);
  }
};
