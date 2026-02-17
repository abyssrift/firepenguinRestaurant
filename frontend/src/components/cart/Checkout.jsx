import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, CreditCard, MapPin, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = ({ cart, totalPrice, clearCart }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        paymentMethod: 'Card'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const orderPayload = {
                cartItems: cart,
                totalPrice: totalPrice,
                customerId: 1, // Mock ID
                customerAddress: formData.address,
                customerPhone: formData.phone,
                paymentMethod: formData.paymentMethod
            };

            await axios.post('/api/orders', orderPayload);
            clearCart();
            alert('Order placed successfully!');
            navigate('/');
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Add some delicious food to get started!</p>
                <Link to="/" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center">
                <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg mr-4 text-gray-600">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4">
                                <img src={item.imageURL} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    <div className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price}</div>
                                </div>
                                <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center text-xl font-extrabold">
                        <span>Total</span>
                        <span className="text-primary-600">${totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                {/* Shipping Form */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">Delivery Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                                <input
                                    required
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                                <input
                                    required
                                    type="tel"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Method</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className={`p-4 rounded-xl border-2 flex items-center justify-center space-x-2 font-bold transition-all ${formData.paymentMethod === 'Card'
                                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                                            : 'border-gray-100 hover:border-gray-200 text-gray-600'
                                        }`}
                                    onClick={() => setFormData({ ...formData, paymentMethod: 'Card' })}
                                >
                                    <CreditCard className="w-5 h-5" />
                                    <span>Card</span>
                                </button>
                                <button
                                    type="button"
                                    className={`p-4 rounded-xl border-2 flex items-center justify-center space-x-2 font-bold transition-all ${formData.paymentMethod === 'Cash'
                                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                                            : 'border-gray-100 hover:border-gray-200 text-gray-600'
                                        }`}
                                    onClick={() => setFormData({ ...formData, paymentMethod: 'Cash' })}
                                >
                                    <span>Cash on Delivery</span>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-200 mt-6 transition-transform active:scale-95"
                        >
                            {isSubmitting ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
