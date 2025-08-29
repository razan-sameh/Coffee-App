import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {Styles} from './TrackOrderStyle';
import FastImage from 'react-native-fast-image';
import {ArrowBack} from '../../Components/ArrowBack';
import {images} from '../../Content/resources';
import {useGetOrderByIdQuery} from '../../services/firebaseApi';
import {useRoute} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import moment from 'moment';
import {enmOrderStatus} from '../../Content/Enums';
import {typUser} from '../../Content/Types';
import {getUserById} from '../../services/userServices';
import {callPhoneNumber} from '../../Content/Utils';

export default function TrackOrder() {
  const route = useRoute<any>();
  const {orderId} = route.params;
  const {data: order, isLoading} = useGetOrderByIdQuery(orderId);
  const [driverLocation, setDriverLocation] = useState({
    latitude: order?.driverLocation?.latitude ?? 31.233804468506055,
    longitude: order?.driverLocation?.longitude ?? 29.949878491206622,
  });
  const [driverInfo, setDriverInfo] = useState<typUser | null>(null);
  const webViewRef = useRef<WebView>(null);
  const statusMessages: Record<enmOrderStatus, string> = {
    [enmOrderStatus.Placed]: 'Your order has been placed',
    [enmOrderStatus.Brewing]: 'We’re preparing your coffee',
    [enmOrderStatus.Ready]: 'Your coffee is ready for pickup',
    [enmOrderStatus.OutForDelivery]: 'Your order is already on its way to you',
    [enmOrderStatus.Delivered]: 'Your order has been delivered',
  };

  useEffect(() => {
    const fetchDriver = async () => {
      const driverUid: string = order?.driver!;
      if (driverUid) {
        const user = await getUserById(driverUid);
        setDriverInfo(user);
      }
    };

    fetchDriver();
  }, [order?.driver, orderId]);

  // 🔥 Listen to Firebase driver location updates
  useEffect(() => {
    const ref = database().ref(`order/${orderId}/driverLocation`);
    const unsubscribe = ref.on('value', snap => {
      const loc = snap.val();
      if (loc) {
        setDriverLocation(loc);
      }
    });
    return () => ref.off('value', unsubscribe);
  }, [orderId]);

  // 🔥 Inject JS to move driver marker when location changes
  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `updateDriver(${driverLocation.latitude}, ${driverLocation.longitude}); true;`,
      );
    }
  }, [driverLocation]);

  if (isLoading || !order) {
    return (
      <View style={Styles.mainContainer}>
        <Text>Loading order...</Text>
      </View>
    );
  }

  const leafletHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <style>
        #map { position:absolute; top:0; bottom:0; right:0; left:0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([${driverLocation.latitude}, ${driverLocation.longitude}], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        var customIcon = L.divIcon({
          className: "",
          html: \`
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
              <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.9 12.5 41 12.5 41C12.5 41 25 21.9 25 12.5C25 5.6 19.4 0 12.5 0Z" 
                    fill="#C08F54" stroke="black" stroke-width="1"/>
              <circle cx="12.5" cy="12.5" r="5" fill="white" stroke="black" stroke-width="1"/>
            </svg>
          \`,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -34],
        });

        var driverMarker = L.marker([${driverLocation.latitude}, ${driverLocation.longitude}], {icon: customIcon}).addTo(map);
        var destMarker = L.marker([${order?.deliveryInfo.address?.latitude}, ${order?.deliveryInfo.address?.longitude}], {icon: customIcon}).addTo(map);

        // Draw the route once at load
        var routeLine = L.polyline([], {color: '#251919'}).addTo(map);

        var url = "https://router.project-osrm.org/route/v1/driving/${driverLocation.longitude},${driverLocation.latitude};${order?.deliveryInfo.address?.longitude},${order?.deliveryInfo.address?.latitude}?overview=full&geometries=geojson";
        fetch(url)
          .then(res => res.json())
          .then(data => {
            if (data.routes.length > 0) {
              var coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
              routeLine.setLatLngs(coords);
              map.fitBounds(routeLine.getBounds());
            }
          })
          .catch(err => console.error(err));

        // ✅ Move the driver marker smoothly (no zoom/pan each update)
        function updateDriver(lat, lng) {
          driverMarker.setLatLng([lat, lng]);
        }

        true;
      </script>
    </body>
    </html>
  `;

  return (
    <View style={Styles.mainContainer}>
      <View style={{paddingLeft: 10}}>
        <ArrowBack />
      </View>
      <FastImage
        style={Styles.wallCoffeeImage1}
        resizeMode="contain"
        source={images.ForgetPasswordwallIcon1}
      />
      <FastImage
        style={Styles.wallCoffeeImage2}
        resizeMode="contain"
        source={images.ForgetPasswordwallIcon2}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
          paddingTop: 10,
        }}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{html: leafletHTML}}
        />

        <View style={Styles.orderContainer}>
          <Text style={Styles.deliveryTime}>
            Estimated Delivery Time is{' '}
            {moment(order.estimatedTime, 'HH:mm').format('h:mm A')}
          </Text>
          <Text style={Styles.statusText}>
            {statusMessages[order.status as enmOrderStatus] ??
              'Updating your order status...'}
          </Text>

          <View style={Styles.stepsRow}>
            <FastImage style={Styles.stepsIcon} source={images.ready} />
            <Text style={Styles.dots}> .......... </Text>
            <FastImage style={Styles.stepsIcon} source={images.onWay} />
            <Text style={Styles.dots}> .......... </Text>
            <FastImage style={Styles.stepsIcon} source={images.ConfirmedIcon} />
          </View>

          <View style={Styles.courierCard}>
            <FastImage
              style={Styles.courierImage}
              source={
                driverInfo?.profilePicture
                  ? {uri: driverInfo.profilePicture}
                  : images.driver
              }
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={Styles.courierName}>
                {driverInfo
                  ? `${driverInfo.firstName} ${driverInfo.lastName}`
                  : 'Assigning driver...'}
              </Text>
              <Text style={Styles.courierRole}>
                {driverInfo?.role ?? 'Courier'}
              </Text>
            </View>
            <TouchableOpacity
              style={Styles.iconBtn}
              onPress={() => {
                const phone = driverInfo?.phoneNumber?.[0]; // first element of array
                console.log({phone});
                if (phone?.number) {
                  callPhoneNumber(phone.countryCode, phone.number);
                } else {
                  Alert.alert('Driver phone not available');
                }
              }}>
              <FastImage style={Styles.courierIcon} source={images.phone} />
            </TouchableOpacity>

            <TouchableOpacity style={Styles.iconBtn}>
              <FastImage style={Styles.courierIcon} source={images.chat} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
