import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight, ArrowLeft, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CartSidebar() {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerAddress: '',
        customerPhone: '',
    });

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const orderData = {
                cartItems,
                totalPrice: cartTotal,
                customerName: formData.customerName,
                customerAddress: formData.customerAddress,
                customerPhone: formData.customerPhone,
                paymentMethod: 'Card' // Hardcoded for demo
            };

            await axios.post('http://localhost:5000/api/orders', orderData);

            setIsSuccess(true);
            toast.success("Order placed successfully!");
            setTimeout(() => {
                clearCart();
                setIsSuccess(false);
                setIsCheckout(false);
                setIsCartOpen(false);
                setFormData({ customerName: '', customerAddress: '', customerPhone: '' });
            }, 3000);
        } catch (error) {
            console.error("Checkout failed", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-white/5 z-[70] p-6 shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                {isCheckout && !isSuccess && (
                                    <button
                                        onClick={() => setIsCheckout(false)}
                                        className="p-1 hover:bg-white/5 rounded-full"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                                    </button>
                                )}
                                <h2 className="text-2xl font-heading font-bold">
                                    {isSuccess ? 'Success!' : isCheckout ? 'Checkout' : 'Your Order'}
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                            {isSuccess ? (
                                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                        <Check className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading mb-2">Order Confirmed!</h3>
                                    <p className="text-gray-400">Your order is being prepared.</p>
                                </div>
                            ) : isCheckout ? (
                                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                        <input
                                            required
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleInputChange}
                                            className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Delivery Address</label>
                                        <textarea
                                            required
                                            name="customerAddress"
                                            value={formData.customerAddress}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="123 Street Name, City"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                                        <input
                                            required
                                            name="customerPhone"
                                            value={formData.customerPhone}
                                            onChange={handleInputChange}
                                            className="w-full bg-background border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl mt-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-400">Subtotal</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-400">Delivery Fee</span>
                                            <span>$5.00</span>
                                        </div>
                                        <div className="border-t border-white/10 my-2 pt-2 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span className="text-primary">${(cartTotal + 5).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    {cartItems.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                                <ShoppingBag className="w-10 h-10 text-gray-500" />
                                            </div>
                                            <p className="text-xl font-heading font-bold text-white mb-2">Your cart is empty</p>
                                            <p className="text-sm">Add some delicious items from the menu!</p>
                                        </div>
                                    ) : (
                                        cartItems.map(item => (
                                            <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-xl"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-bold mb-1">{item.name}</h4>
                                                    <p className="text-primary font-bold mb-3">${(item.price * item.quantity).toFixed(2)}</p>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3 bg-background rounded-lg p-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="p-1 hover:text-primary transition-colors"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="p-1 hover:text-primary transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
                        </div>

                        {!isSuccess && cartItems.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-white/10">
                                {!isCheckout && (
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-gray-400">Total</span>
                                        <span className="text-3xl font-heading font-bold text-white">
                                            ${cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                <button
                                    onClick={isCheckout ? undefined : () => setIsCheckout(true)}
                                    type={isCheckout ? "submit" : "button"}
                                    form={isCheckout ? "checkout-form" : undefined}
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Processing...' : isCheckout ? 'Place Order' : 'Proceed to Checkout'}
                                    {!isCheckout && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
