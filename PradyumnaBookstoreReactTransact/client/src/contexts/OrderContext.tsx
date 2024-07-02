import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { orderDetailReducer } from '../reducers/OrderDetailReducer';
import type { OrderDetails } from '../types';

const ORDER_DETAILS_KEY = 'orderDetails';

const initOrderState: OrderDetails = JSON.parse(localStorage.getItem(ORDER_DETAILS_KEY) || '{}');

export type OrderContextType = {
    orderDetails: OrderDetails;
    dispatch: React.Dispatch<any>;
};

export const OrderStore = createContext<OrderContextType>({
    orderDetails: initOrderState,
    dispatch: () => undefined,
});

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orderDetails, dispatch] = useReducer(orderDetailReducer, initOrderState);

    useEffect(() => {
        localStorage.setItem(ORDER_DETAILS_KEY, JSON.stringify(orderDetails));
    }, [orderDetails]);

    return (
        <OrderStore.Provider value={{ orderDetails, dispatch }}>
            {children}
        </OrderStore.Provider>
    );
};
