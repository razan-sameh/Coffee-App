// OrderSimulation.ts
import database from '@react-native-firebase/database';
import {enmOrderStatus, enmRole} from './Enums';
import {typLocation, typUser} from './Types';
import {serverURL} from '../../App';
import {getUserID} from '../services/Authentication';

// Types for simulation
export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface RouteResult {
  points: RoutePoint[];
  duration: number; // in seconds
}

export interface StatusMessage {
  title: string;
  body: string;
}

export interface SimulationResult {
  success: boolean;
  message: string;
  steps: number;
  estimatedArrival: string;
  driver: string;
}

export interface Driver extends typUser {
  uid: string;
}

// Keep track of active simulations
const activeSimulations: Record<string | number, NodeJS.Timeout> = {};

// Fetch route from OSRM
const fetchRoute = async (
  start: RoutePoint,
  destination: RoutePoint,
): Promise<RouteResult> => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes?.length > 0) {
      return {
        points: data.routes[0].geometry.coordinates.map(
          (c: [number, number]) => ({
            latitude: c[1],
            longitude: c[0],
          }),
        ),
        duration: data.routes[0].duration,
      };
    }
    return {points: [], duration: 0};
  } catch (error) {
    console.error('Error fetching route:', error);
    return {points: [], duration: 0};
  }
};

// Get random driver
const getRandomDriver = async (): Promise<Driver> => {
  try {
    const snapshot = await database().ref('user').once('value');
    const users = snapshot.val() || {};

    // Filter only drivers
    const drivers: Driver[] = Object.entries(users)
      .filter(([, user]: [string, any]) => user.role === enmRole.driver)
      .map(([uid, user]: [string, any]) => ({uid, ...user} as Driver));

    if (drivers.length === 0) {
      throw new Error('No drivers available');
    }

    // Pick a random driver
    const randomIndex = Math.floor(Math.random() * drivers.length);
    return drivers[randomIndex];
  } catch (error) {
    console.error('Error getting random driver:', error);
    throw error;
  }
};

// Send local notification (optional - for the user who placed the order)
const sendLocalNotification = async (
  status: enmOrderStatus,
  orderId: string | number,
): Promise<void> => {
  const uid = getUserID();
  try {
    const response = await fetch(`${serverURL}/send-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({uid, status, orderId}),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send notification');
    }

    console.log('✅ Notification sent via server:', result);
  } catch (err) {
    console.error('❌ Error sending notification:', err);
  }
};

// Update order status in Firebase
const updateOrderStatus = async (
  orderId: string | number,
  status: enmOrderStatus,
): Promise<void> => {
  try {
    await database().ref(`order/${orderId}/status`).set(status);
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

// Main simulation function with persistence
export const startOrderSimulation = async (
  orderId: string | number,
  customerUid: string,
  deliveryAddress: typLocation,
): Promise<SimulationResult> => {
  try {
    if (!deliveryAddress?.latitude || !deliveryAddress?.longitude) {
      throw new Error('Invalid delivery address provided');
    }

    if (activeSimulations[orderId]) {
      clearInterval(activeSimulations[orderId]);
      delete activeSimulations[orderId];
    }

    // Initial status
    await updateOrderStatus(orderId, enmOrderStatus.Placed);

    // Driver
    const driver = await getRandomDriver();
    await database().ref(`order/${orderId}/driver`).set(driver.uid);

    // Destination
    const destination: RoutePoint = {
      latitude: deliveryAddress.latitude,
      longitude: deliveryAddress.longitude,
    };

    // Initial driver location (coffee shop)
    const driverLocation: RoutePoint = {
      latitude: 31.233804468506055,
      longitude: 29.949878491206622,
    };

    await database()
      .ref(`order/${orderId}/driverLocation`)
      .set({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        address: null,
      } as typLocation);

    // Fetch route
    const {points: route, duration} = await fetchRoute(
      driverLocation,
      destination,
    );
    if (route.length === 0) throw new Error('No route found');

    // ETA
    const now = new Date();
    const arrivalTime = new Date(now.getTime() + duration * 1000);
    const etaFormatted = `${arrivalTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${arrivalTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    await database().ref(`order/${orderId}/estimatedTime`).set(etaFormatted);

    // Persist simulation metadata in Firebase
    const stepIntervalMs = 5000;
    await database().ref(`order/${orderId}/simulation`).set({
      route,
      stepIntervalMs,
      startTime: now.toISOString(),
      currentStep: 0,
    });

    // Status notifications
    setTimeout(() => {
      updateOrderStatus(orderId, enmOrderStatus.Brewing);
      sendLocalNotification(enmOrderStatus.Brewing, orderId);
    }, 2000);

    setTimeout(() => {
      updateOrderStatus(orderId, enmOrderStatus.Ready);
      sendLocalNotification(enmOrderStatus.Ready, orderId);
    }, 5000);

    setTimeout(() => {
      updateOrderStatus(orderId, enmOrderStatus.OutForDelivery);
      sendLocalNotification(enmOrderStatus.OutForDelivery, orderId);
    }, 8000);

    // Driver movement simulation
    let step = 0;
    activeSimulations[orderId] = setInterval(async () => {
      if (step >= route.length) {
        clearInterval(activeSimulations[orderId]);
        delete activeSimulations[orderId];

        await database().ref(`order/${orderId}/driverLocation`).set({
          latitude: destination.latitude,
          longitude: destination.longitude,
          address: deliveryAddress.address,
        });
        await updateOrderStatus(orderId, enmOrderStatus.Delivered);
        await database().ref(`order/${orderId}/simulation`).remove();
        sendLocalNotification(enmOrderStatus.Delivered, orderId);
        return;
      }

      const currentPoint = route[step];
      const currentLocation: typLocation = {
        latitude: currentPoint.latitude,
        longitude: currentPoint.longitude,
        address: null,
      };

      await database()
        .ref(`order/${orderId}/driverLocation`)
        .set(currentLocation);

      step++; // ⬅️ increment at the end
      await database().ref(`order/${orderId}/simulation/currentStep`).set(step);
    }, stepIntervalMs);

    return {
      success: true,
      message: 'Order simulation started',
      steps: route.length,
      estimatedArrival: etaFormatted,
      driver: driver.uid,
    };
  } catch (error) {
    console.error('Error starting order simulation:', error);
    throw error;
  }
};

export const resumeOrderSimulation = async (orderId: string) => {
  const snapshot = await database()
    .ref(`order/${orderId}/simulation`) // ✅ use "orders"
    .once('value');
  const sim = snapshot.val();

  if (!sim) return;

  const {route, stepIntervalMs, startTime, currentStep} = sim;
  if (!route || route.length === 0) return;

  // 🔹 Calculate how many steps we should be on
  const elapsedSteps = Math.floor(
    (Date.now() - new Date(startTime).getTime()) / stepIntervalMs,
  );

  let step = Math.max(currentStep, elapsedSteps);

  // 🔹 If simulation is already finished → deliver immediately
  if (step >= route.length) {
    await database()
      .ref(`order/${orderId}/driverLocation`)
      .set({
        latitude: route[route.length - 1].latitude,
        longitude: route[route.length - 1].longitude,
        address: null,
      });

    await updateOrderStatus(orderId, enmOrderStatus.Delivered);
    await database().ref(`order/${orderId}/simulation`).remove();

    // ✅ send notification even in resume case
    await sendLocalNotification(enmOrderStatus.Delivered, orderId);

    return;
  }

  // 🔹 Fast-forward to the correct step immediately
  const currentPoint = route[step];
  await database().ref(`order/${orderId}/driverLocation`).set({
    latitude: currentPoint.latitude,
    longitude: currentPoint.longitude,
    address: null,
  });
  await database().ref(`order/${orderId}/simulation/currentStep`).set(step);

  // 🔹 Resume ticking from here
  activeSimulations[orderId] = setInterval(async () => {
    step++;
    if (step >= route.length) {
      clearInterval(activeSimulations[orderId]);
      delete activeSimulations[orderId];

      await database()
        .ref(`order/${orderId}/driverLocation`)
        .set({
          latitude: route[route.length - 1].latitude,
          longitude: route[route.length - 1].longitude,
          address: null,
        });
      await updateOrderStatus(orderId, enmOrderStatus.Delivered);
      await database().ref(`order/${orderId}/simulation`).remove();

      // ✅ send notification when simulation ends
      await sendLocalNotification(enmOrderStatus.Delivered, orderId);

      return;
    }

    const nextPoint = route[step];
    await database().ref(`order/${orderId}/driverLocation`).set({
      latitude: nextPoint.latitude,
      longitude: nextPoint.longitude,
      address: null,
    });
    await database().ref(`order/${orderId}/simulation/currentStep`).set(step);
  }, stepIntervalMs);
};

// Stop simulation (useful for cancellations)
export const stopOrderSimulation = (orderId: string | number): boolean => {
  if (activeSimulations[orderId]) {
    clearInterval(activeSimulations[orderId]);
    delete activeSimulations[orderId];
    return true;
  }
  return false;
};

// Check if simulation is running
export const isSimulationActive = (orderId: string | number): boolean => {
  return !!activeSimulations[orderId];
};

// Get all active simulations
export const getActiveSimulations = (): (string | number)[] => {
  return Object.keys(activeSimulations);
};

// Cleanup all simulations (call when app is closing)
export const cleanupAllSimulations = (): void => {
  Object.keys(activeSimulations).forEach(orderId => {
    clearInterval(activeSimulations[orderId]);
  });
  // Clear the object
  Object.keys(activeSimulations).forEach(key => delete activeSimulations[key]);
};
