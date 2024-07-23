import React, { createContext, useEffect, useReducer, useState } from 'react';
import cartReducer from './cartReducer';

const cartContext = createContext();

// const initialState = {
//     cartItems: []
// };

const CartProvider = ({ children }) => {

    const [eligible, setEligible] = useState(localStorage.getItem("auth"));
    const [initialState, setInitialState] = useState({cartItems: []});
    const fetcher = async () => {
        try {
            if(eligible){
                const email = localStorage.getItem("token");
                const res = await fetch(`http://localhost:8000/api/user/products?email=${email}`);
                const data = await res.json();
                console.log(data);
                setInitialState(prev => ({cartItems:[...prev.cartItems,...data.products]}));
            }
        } catch (err) {
            console.log("an error",err);
        }
    }

    useEffect(() => {
        fetcher();
    },[eligible]);

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = (item) => {
        return dispatch({
            type: 'ADD_TO_CART',
            payload: { item }
        });
    };

    const removeItem = (itemId) => {
        return dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { itemId }
        });
    };

    const incrementItem = (itemId) => {
        return dispatch({
            type: 'INCREMENT_ITEM',
            payload: { itemId }
        });
    };

    const decrementItem = (itemId) => {
        return dispatch({
            type: 'DECREMENT_ITEM',
            payload: { itemId }
        });
    };

    const values = {
        ...state,
        addItem,
        removeItem,
        incrementItem,
        decrementItem
    };

    return (
        <cartContext.Provider value={values}>
            {children}
        </cartContext.Provider>
    );
};


export default cartContext;
export { CartProvider };