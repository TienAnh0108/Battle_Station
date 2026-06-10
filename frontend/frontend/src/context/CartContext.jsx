import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize the shopping cart from LocalStorage if available; otherwise, leave the array empty.
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('battlestation_cart');
        return localData ? JSON.parse(localData) : [];
    });

    // Every time the shopping cart changes, it automatically overwrites the changes in LocalStorage.
    useEffect(() => {
        localStorage.setItem('battlestation_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Function adding product to Cart
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const isExist = prevItems.find(item => item.id === product.id);
            if (isExist) {
                // If product was added, increasing the number by 1
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // If product was not added, increasing the default number is 1
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    // Fuction remove product from Cart
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    // Fuction update quantity with + -
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
        );
    };

    // Clear Shopping Cart Function (after placing an order)
    const clearCart = () => setCartItems([]);

    // Calculate the total number of items in the cart (displayed on the cart icon in the Navbar).
    const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

    // Calculate the total price of the entire shopping cart.
    const getCartTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};