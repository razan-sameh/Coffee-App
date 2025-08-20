import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {typAddress, typLocation} from '../Content/Types';

type LocationContextType = {
  location: typLocation;
  setLocation: (
    loc: {latitude: number; longitude: number},
    picked?: boolean,
  ) => void;
  isPicked: boolean;
  setIsPicked: (value: boolean) => void; // add this
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
  isPicked: false,
  setIsPicked: () => {}, // default
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({children}: {children: ReactNode}) => {
  const [location, setLocationState] = useState<typLocation>(null);
  const [isPicked, setIsPicked] = useState(false);

  const setLocation = async (
    loc: {latitude: number; longitude: number},
    picked = false,
  ) => {
    try {
      const {latitude, longitude} = loc;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'User-Agent': 'MyReactNativeApp/1.0 (myemail@example.com)',
            Accept: 'application/json',
          },
        },
      );

      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        console.log('Reverse geocoding returned non-JSON:', text);
        setLocationState({latitude, longitude, address: null});
        if (picked) setIsPicked(true); // move here
        return;
      }

      const address: typAddress = {
        house_number: data.address?.house_number || null,
        road: data.address?.road || null,
        city:
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          null,
        country: data.address?.country || null,
      };

      setLocationState({
        latitude,
        longitude,
        address,
      });

      if (picked) setIsPicked(true); // ✅ only mark picked when address is ready
    } catch (err) {
      console.log('Reverse geocoding failed:', err);
      setLocationState({...loc, address: null});
      if (picked) setIsPicked(true); // still resolve
    }
  };

  // 🔹 Optional: fetch initial GPS location on mount
  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setLocation(
          {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          false,
        );
      },
      error => {
        console.log('Error getting initial location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <LocationContext.Provider
      value={{location, setLocation, isPicked, setIsPicked}}>
      {children}
    </LocationContext.Provider>
  );
};
