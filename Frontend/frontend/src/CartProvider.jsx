import React, { Children, useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
const ACTIONS = {
    ADDTOCART : 'ADD_TO_CART',
    REMOVEFROMCART : 'REMOVE_FROM_CART',
    CLEARCART : 'CLEAR_CART'
}
export const CartContext = createContext();
const cartReducer = (state, action) => {
    const situation = action.type;
    switch (situation) {
        case ACTIONS.ADDTOCART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
                totalPrice: state.totalPrice + action.payload.price
            };
        case ACTIONS.REMOVEFROMCART:
            const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
            const updatedTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
            return {
                ...state,
                cart: updatedCart,
                totalPrice: updatedTotal
            };
        case ACTIONS.CLEARCART:
            return {
                cart: [],
                totalPrice: 0
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) =>{
    const [state,dispatch] = useReducer(cartReducer, {cart: [],totalPrice:0});
    
    const addToCart = (item) =>{
        dispatch({type: ACTIONS.ADDTOCART,payload: item})
    }

    const removeFromCart = (item) =>{
        dispatch({type: ACTIONS.REMOVEFROMCART,payload: item})
    }

    const clearCart = () =>{
        dispatch({type: ACTIONS.CLEARCART})
    }

    return(
        <CartContext.Provider value={{...state , addToCart ,removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}




