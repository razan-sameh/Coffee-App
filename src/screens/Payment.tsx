// import React, {useState} from 'react';
// import {Alert, Button, Text, View} from 'react-native';
// import {Styles} from '../styles/Payment';
// import {ArrowBack} from '../Components/ArrowBack';
// import FastImage from 'react-native-fast-image';
// import {images} from '../Content/resources';
// import {useStripe, CardField} from '@stripe/stripe-react-native';
// import type {CardFieldInput} from '@stripe/stripe-react-native';

// export function Payment() {
//   const {confirmPayment} = useStripe();
//   const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(
//     null,
//   );

//   const handlePay = async () => {
//     if (!cardDetails?.complete) {
//       Alert.alert('Please enter complete card details');
//       return;
//     }

//     try {
//       const response = await fetch(
//         'http://localhost:3000/create-payment-intent',
//         {
//           method: 'POST',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({amount: 500}),
//         },
//       );

//       const {clientSecret} = await response.json();

//       const {error, paymentIntent} = await confirmPayment(clientSecret, {
//         paymentMethodType: 'Card',
//         paymentMethodData: {
//           billingDetails: {
//             email: 'test@example.com',
//           },
//         },
//       });

//       if (error) {
//         Alert.alert('Payment failed', error.message);
//       } else if (paymentIntent) {
//         Alert.alert('Payment successful', `Status: ${paymentIntent.status}`);
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message);
//     }
//   };

//   return (
//     <View style={Styles.mainContainer}>
//       <View style={Styles.backArrowContainer}>
//         <ArrowBack />
//         <Text style={Styles.txtTitle}>Payment</Text>
//       </View>
//       <FastImage
//         style={Styles.wave}
//         resizeMode="contain"
//         source={images.WallWave}
//       />
//       <FastImage
//         style={Styles.wallCoffeeImage1}
//         resizeMode="contain"
//         source={images.LoginWallIcon1}
//       />
//       <FastImage
//         style={Styles.wallCoffeeImage2}
//         resizeMode="contain"
//         source={images.LoginWallIcon2}
//       />
//       <CardField
//         postalCodeEnabled={false}
//         placeholders={{number: '4242 4242 4242 4242'}}
//         onCardChange={details => setCardDetails(details)}
//         style={{height: 50, marginVertical: 30}}
//       />
//       <Button title="Pay $5" onPress={handlePay} />
//     </View>
//   );
// }
