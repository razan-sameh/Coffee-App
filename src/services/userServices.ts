import database from '@react-native-firebase/database';
import {typLocation, typPhone, typUser} from '../Content/Types';
import auth from '@react-native-firebase/auth';
import {enmRole} from '../Content/Enums';
// Create new user
export const createUser = async (
  Uid: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<void> => {
  const reference = database().ref(`/user/${Uid}`);
  await reference.set({
    Uid,
    firstName,
    lastName,
    email,
    password,
    isActive: true,
    role: enmRole.customer,
  });
};
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
  address?: typLocation[];
  phoneNumber?: typPhone[];
  profilePicture?: string;
};

export const updateUserProfile = async ({
  Uid,
  firstName,
  lastName,
  address,
  phoneNumber,
  profilePicture,
}: UpdateUserPayload): Promise<void> => {
  const user = auth().currentUser;
  const userRef = database().ref(`user/${Uid}`);
  const snapshot = await userRef.once('value');
  const existingUser = snapshot.val();

  const updates: any = {};

  const finalFirstName = firstName ?? existingUser?.firstName ?? '';
  const finalLastName = lastName ?? existingUser?.lastName ?? '';

  // update firebase auth profile
  if (user && (firstName || lastName)) {
    await user.updateProfile({
      displayName: `${finalFirstName} ${finalLastName}`.trim(),
    });
  }

  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;

  if (phoneNumber) {
    updates.phoneNumber = phoneNumber.map(p => ({
      countryCode: p.countryCode,
      number: p.number,
      countryISO: p.countryISO,
    }));
  }

  if (address) updates.address = address;
  if (profilePicture) updates.profilePicture = profilePicture;

  if (Object.keys(updates).length > 0) {
    await userRef.update(updates);
  }
};
