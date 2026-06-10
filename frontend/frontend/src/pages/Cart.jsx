import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import API from '../services/api';

const Cart = () => {
    // Extract state parameters and handling methods from the global CartContext
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);

    // Asynchronous function to handle checkout payload submission to Django view
    const handleCheckout = () => {
        const orderPayload = {
            items: cartItems,
            total: getCartTotal()
        };

        API.post('checkout/', orderPayload)
            .then(response => {
                if (response.data.success) {
                    alert(`Order #${response.data.order_id} placed successfully! Thank you for shopping.`);
                    clearCart();
                    window.location.href = '/';
                }
            })
            .catch(error => {
                console.error("Checkout process encountered an error:", error);
                alert("Failed to place order. Please try again later.");
            });
    };

    // Shared style object for unified layout wrappers
    const containerStyle = {
        maxWidth: '1000px',
        width: '90%',
        margin: '50px auto',
        padding: '40px',
        fontFamily: 'sans-serif',
        backgroundColor: '#161616',
        color: '#fff',
        borderRadius: '12px',
        border: '1px solid #2a2a2a',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
    };

    // Render wide empty cart state gracefully if item count is zero (Navbar removed)
    if (cartItems.length === 0) {
        return (
            <div style={containerStyle}>
                <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '15px' }}>Your Cart is Empty</h2>
                <p style={{ color: '#888', textAlign: 'center', marginBottom: '30px', fontSize: '16px' }}>
                    Go back to the shop to add some premium battle stations!
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button 
                        onClick={() => window.location.href = '/'}
                        style={{ padding: '12px 30px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h2 style={{ fontSize: '26px', fontWeight: '600', marginBottom: '10px', borderBottom: '1px solid #2a2a2a', paddingBottom: '15px' }}>
                Shopping Cart
            </h2>
            
            {/* List items iterative rendering container */}
            <div style={{ marginTop: '10px' }}>
                {cartItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #222' }}>
                        
                        {/* Flex section 1: Dynamic product descriptors */}
                        <div style={{ flex: '2.5' }}>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '500' }}>{item.name}</h4>
                            <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>Unit Price: <span style={{ color: '#28a745', fontWeight: '500' }}>${item.price}</span></p>
                        </div>

                        {/* Flex section 2: Inline custom quantity alteration stepper */}
                        <div style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                style={{ width: '32px', height: '32px', backgroundColor: '#2a2a2a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                                type="button"
                            >
                                -
                            </button>
                            <span style={{ width: '25px', textAlign: 'center', fontSize: '16px', fontWeight: '500' }}>{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                style={{ width: '32px', height: '32px', backgroundColor: '#2a2a2a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                                type="button"
                            >
                                +
                            </button>
                        </div>

                        {/* Flex section 3: Calculated row subtotal summary */}
                        <div style={{ flex: '1', textAlign: 'right', fontWeight: '600', fontSize: '18px', color: '#fff' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        {/* Flex section 4: Singular item clearance entity trigger */}
                        <div style={{ flex: '0.8', textAlign: 'right' }}>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                style={{ backgroundColor: 'transparent', color: '#ff6b6b', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                                type="button"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart operational and monetary checkout footer layout (Navbar removed) */}
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2a2a2a', paddingTop: '25px' }}>
                <button 
                    onClick={clearCart}
                    style={{ padding: '12px 20px', backgroundColor: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
                    type="button"
                >
                    Clear Total Cart
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#aaa' }}>
                        Total Basket: <span style={{ color: '#28a745', fontWeight: '700', fontSize: '24px', marginLeft: '5px' }}>${getCartTotal().toFixed(2)}</span>
                    </h3>
                    <button 
                        onClick={handleCheckout}
                        style={{ padding: '14px 35px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 12px rgba(40, 167, 69, 0.2)' }}
                        type="button"
                    >
                        Proceed Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;