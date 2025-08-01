import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  strPrimaryColor,
  strSecondColor,
  moderateScale,
} from '../styles/responsive';

export default function ErrorScreen({onRetry}: {onRetry: () => void}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops! Something went wrong.</Text>
      {/* <Text style={styles.description}>
        Welcome to Coffee App ☕️ - your daily dose of freshly brewed coffee. We
        bring you top-rated products and exclusive offers!
      </Text> */}
      <TouchableOpacity onPress={onRetry} style={styles.button}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: strSecondColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: strPrimaryColor,
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(14),
    color: '#333',
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  button: {
    backgroundColor: strPrimaryColor,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
});
