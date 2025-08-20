/* eslint-disable react-native/no-inline-styles */
// src/screens/LocationPicker.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useLocation} from '../provider/LocationProvider';

const LocationPicker = () => {
  const [localLocation, setLocalLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [initialLocation, setInitialLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute<any>();
  const {setLocation} = useLocation();

  useEffect(() => {
    const paramLoc = route.params?.initialLocation;

    if (paramLoc) {
      // 1️⃣ Use initialLocation from param
      setInitialLocation(paramLoc);
      return;
    }

    // 2️⃣ Else get current device location
    const getPermissionAndLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return;
        }
      }

      Geolocation.getCurrentPosition(
        pos => {
          setInitialLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        error => console.log('Geolocation error:', error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    getPermissionAndLocation();
  }, [route.params]);

  if (!initialLocation) {
    return <View style={{flex: 1, backgroundColor: 'white'}} />; // loading placeholder
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style>
          #map { height: 100vh; width: 100vw; margin:0; padding:0; }
          body { margin:0; padding:0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${initialLocation.latitude}, ${initialLocation.longitude}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          var marker;

          function addMarker(lat, lng) {
            if (marker) {
              marker.setLatLng([lat, lng]);
            } else {
              marker = L.marker([lat, lng], { draggable: true }).addTo(map);
              marker.on('dragend', function() {
                var pos = marker.getLatLng();
                window.ReactNativeWebView.postMessage(JSON.stringify(pos));
              });
            }
            window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: lat, longitude: lng }));
          }

          map.on('click', function(e) {
            addMarker(e.latlng.lat, e.latlng.lng);
          });

          addMarker(${initialLocation.latitude}, ${initialLocation.longitude});
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const loc = JSON.parse(event.nativeEvent.data);
      setLocalLocation(loc);
    } catch (err) {
      console.log('Error parsing location from WebView:', err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{html}}
        onMessage={handleMessage}
        style={{flex: 1}}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Done"
          onPress={() => {
            if (localLocation) {
              setLocation(localLocation, true);
            }
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default LocationPicker;
