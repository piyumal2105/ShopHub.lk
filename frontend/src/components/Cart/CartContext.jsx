// import React, { createContext, useContext, useState } from 'react';
//
// const CartContext = createContext();
//
// export const useCart = () => {
//     return useContext(CartContext);
// };
//
// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);
//
//     const addToCart = (item) => {
//         setCartItems([...cartItems, item]);
//     };
//
//     return (
//         <CartContext.Provider value={{ cartItems, addToCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
