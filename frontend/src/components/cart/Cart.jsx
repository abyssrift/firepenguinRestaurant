import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Cart = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, totalPrice }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderStatus, setOrderStatus] = useState(null);

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        setIsSubmitting(true);
        try {
            // For this demo, we'll use placeholder customer info
            const orderData = {
                cartItems: cart,
                totalPrice: totalPrice,
                customerId: 1 // Default customer ID for demo
            };

            await axios.post('/api/orders', orderData);
            setOrderStatus('success');
            // In a real app, you'd clear the cart here
        } catch (err) {
            console.error('Checkout error:', err);
            setOrderStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl">
                        <div className="flex items-center justify-between px-4 py-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <ShoppingBag className="mr-2" /> Your Cart
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 p-2"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto px-4 py-6">
                            {orderStatus === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Plus className="rotate-45" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
                                    <p className="text-gray-600 mb-6">Your delicious food is being prepared.</p>
                                    <button
                                        onClick={onClose}
                                        className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold"
                                    >
                                        Back to Menu
                                    </button>
                                </div>
                            ) : cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-6">Your cart is empty.</p>
                                    <button
                                        onClick={onClose}
                                        className="text-primary-600 font-bold hover:underline"
                                    >
                                        Start addsome delicious items!
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex items-center space-x-4">
                                            <img
                                                src={item.imageURL}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                            />
                                            <div className="flex-grow">
                                                <div className="flex justify-between">
                                                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                                                    <span className="font-bold text-primary-600">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-2">${item.price.toFixed(2)} each</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center border rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="p-1 hover:bg-gray-100"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="p-1 hover:bg-gray-100"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 text-sm font-medium hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && orderStatus !== 'success' && (
                            <div className="border-t px-4 py-6 bg-gray-50">
                                <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
                                    <span>Subtotal</span>
                                    <span className="text-primary-600">${totalPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>

                                {orderStatus === 'error' && (
                                    <p className="text-red-600 text-sm mb-4">Something went wrong. Please try again.</p>
                                )}

                                <button
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold text-white transition-all
                    ${isSubmitting ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200'}`}
                                >
                                    {isSubmitting ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <span>Checkout</span>
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
