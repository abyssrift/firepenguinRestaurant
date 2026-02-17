import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProductList from './components/products/ProductList';
import CategoryFilter from './components/products/CategoryFilter';
import Cart from './components/cart/Cart';
import AdminDashboard from './components/admin/AdminDashboard';
import Sidebar from './components/common/Sidebar';
import Checkout from './components/cart/Checkout';

const App = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;
        if (category !== 'All') {
            result = result.filter(p => p.category === category);
        }
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredProducts(result);
    }, [category, searchTerm, products]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/products');
            setProducts(res.data);
            setFilteredProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load menu. Please try again later.');
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const CustomerView = () => (
        <>
            <header className="mb-8 text-center flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Our Delicious Menu</h1>
                <p className="text-gray-600 mb-4">Fresh ingredients, amazing taste.</p>
            </header>

            <CategoryFilter activeCategory={category} setCategory={setCategory} />

            <div className="max-w-md mx-auto mb-10">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for dishes..."
                        className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute right-4 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    <span className="ml-4 text-gray-600">Loading Menu...</span>
                </div>
            ) : error ? (
                <div className="text-center text-red-600 py-20">{error}</div>
            ) : (
                <ProductList products={filteredProducts} addToCart={addToCart} />
            )}
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar for Desktop */}
            <Sidebar cartCount={cartCount} />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header / Navbar for smaller screens can be added here or reuse existing Navbar conditionally */}
                <div className="md:hidden">
                    <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
                </div>

                {/* Main Content Area */}
                <main className="flex-grow overflow-y-auto p-4 md:p-8">
                    <Routes>
                        <Route path="/" element={<CustomerView />} />
                        <Route path="/admin" element={<AdminDashboard products={products} fetchProducts={fetchProducts} />} />
                        <Route path="/checkout" element={
                            <Checkout
                                cart={cart}
                                totalPrice={totalPrice}
                                clearCart={clearCart}
                            />
                        } />
                    </Routes>
                </main>
            </div>

            {/* Slide-over Cart (still available via mobile nav or maybe a dedicated button if needed) */}
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                totalPrice={totalPrice}
            />
        </div>
    );
};

export default App;
