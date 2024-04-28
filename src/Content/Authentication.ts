import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '24598469643-j2n8f7apgotbn4h0vm3brc1ptmnqhh06.apps.googleusercontent.com',
});

export async function signinWithGoogle(navigation:any) {
    try {
            // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential);
    console.log('you are sign in sucessfully');
    navigation.navigate("TapNavigator")

    } catch (error) {
        console.log('error:',error);
        
    }

}

export function getUserName() {
    return auth().currentUser?.displayName
}
export function getUserID() {
    return auth().currentUser?.uid
}

export function logOut() {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}