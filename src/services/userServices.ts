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
  address?: typLocation[]; // ✅ now arrays
  phoneNumber?: string[]; // ✅ now arrays
};

export const updateUserProfile = async ({
  Uid,
  firstName,
  lastName,
  address,
  phoneNumber,
}: UpdateUserPayload): Promise<void> => {
  const user = auth().currentUser;
  const userRef = database().ref(`user/${Uid}`);
  const snapshot = await userRef.once('value');
  const existingUser = snapshot.val();

  const updates: any = {};

  // Merge new values with existing ones for displayName
  const finalFirstName = firstName ?? existingUser?.firstName ?? '';
  const finalLastName = lastName ?? existingUser?.lastName ?? '';

  if (user && (firstName || lastName)) {
    await user.updateProfile({
      displayName: `${finalFirstName} ${finalLastName}`.trim(),
    });
  }

  // Save fields individually if they were changed
  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;
  if (phoneNumber) updates.phoneNumber = phoneNumber;
  if (address) updates.address = address;

  if (Object.keys(updates).length > 0) {
    await userRef.update(updates);
  }
};
