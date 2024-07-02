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
                localStorage.setItem('cart', JSON.stringify(newState));
                return newState;
            } else{
                const newState = [
                    ...state,
                    {id: action.id,book:action.item, quantity: 1 },
                ];
                localStorage.setItem('cart', JSON.stringify(newState));
                return newState
            }

        case CartTypes.REMOVE:
            const itemIndexRemove = state.findIndex((item) => item.id === action.id);
            if(itemIndexRemove !== -1){
                const newItem = [...state]
                newItem[itemIndexRemove] = {
                    ...newItem[itemIndexRemove],
                    quantity:newItem[itemIndexRemove].quantity - 1.
                };
                if(newItem[itemIndexRemove].quantity === 0){
                    const updatedCart = newItem.filter(item => item.quantity > 0)
                    localStorage.setItem('cart',JSON.stringify(updatedCart));
                    return updatedCart;
                }
                localStorage.setItem('cart',JSON.stringify(newItem));
                return newItem
            }
            return state;
        case CartTypes.CLEAR:
            localStorage.removeItem('cart');
            return [] ;
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};