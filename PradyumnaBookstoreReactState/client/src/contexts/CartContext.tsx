import {createContext, Dispatch, useReducer} from "react";
import {cartReducer, } from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";

export const StorageKey ="carts"

const initialCartState:ShoppingCartItem[] =  []
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

function CartContext({children}:any){
    const [cart, dispatch] = useReducer(cartReducer,initialCartState);

    return (
        <CartStore.Provider value={{cart, dispatch}}>
            {children}
        </CartStore.Provider>
    );
}

export default CartContext;