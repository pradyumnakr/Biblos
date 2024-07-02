import type {OrderDetails} from "../types";

type AppActions = {
    type:string;
    orderDetails?:OrderDetails;
};

export const OrderDetailTypes = {
    CLEAR:'CLEAR',
    UPDATE:'UPDATE'
};

export const orderDetailReducer = (state: OrderDetails, action:AppActions): OrderDetails =>{
    switch (action.type){
        case OrderDetailTypes.CLEAR:
            return {} as OrderDetails;

        case OrderDetailTypes.UPDATE:
            return action.orderDetails ? action.orderDetails : state;

        default:
            return state;
    }
}

