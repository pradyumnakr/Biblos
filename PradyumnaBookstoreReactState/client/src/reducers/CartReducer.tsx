import {ShoppingCartItem, BookItem} from "../types";
import {Dispatch, ReducerAction} from "react";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};

type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}
export const cartReducer = (state:ShoppingCartItem[], action:AppActions):ShoppingCartItem[] => {
    switch (action.type) {
        case CartTypes.ADD:
            const itemIndex = state.findIndex(item => item.id === action.id)
            if(itemIndex !== -1){
                const newState = [...state];
                newState[itemIndex] = {
                    ...newState[itemIndex],
                    quantity: newState[itemIndex].quantity + 1,
                };
                return newState;
            } else{
                return [
                    ...state,
                    {id: action.id,book:action.item, quantity: 1 },
                ];
            }

        case CartTypes.REMOVE:
            return state.filter((item:ShoppingCartItem):boolean => item.id!== action.id);
        case CartTypes.CLEAR:
            return [] ;  // will be defined in Project 7
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};