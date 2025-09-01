import React, {createContext, useEffect, useRef} from 'react';
import {enmOrderStatus} from '../Content/Enums';
import {resumeOrderSimulation} from '../Content/OrderSimulation';
import {useGetOrdersByUserIdQuery} from '../services/firebaseApi';
import {getUserID} from '../services/Authentication';

interface OrderContextType {
  orders: Record<string, any>;
}

export const OrderContext = createContext<OrderContextType>({orders: {}});

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const uid = getUserID();
  const {data: orders = []} = useGetOrdersByUserIdQuery(uid!, {
    skip: !uid,
  });

  // 🔥 Keep simulations across renders
  const activeSimulations = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (orders.length > 0) {
      orders.forEach(order => {
        if (order.status !== enmOrderStatus.Delivered) {
          if (!activeSimulations.current.has(order.id)) {
            resumeOrderSimulation(order.id);
            activeSimulations.current.add(order.id);
          }
        }
      });
    }
  }, [orders]); // ✅ no warning

  return (
    <OrderContext.Provider
      value={{orders: Object.fromEntries(orders.map(o => [o.id, o]))}}>
      {children}
    </OrderContext.Provider>
  );
};
