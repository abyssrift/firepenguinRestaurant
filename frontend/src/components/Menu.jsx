import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { cn } from '../lib/utils';
import { Filter, Search } from 'lucide-react';

// Mock data in case backend isn't running or empty
const MOCK_PRODUCTS = [
    { id: 1, name: 'Wagyu Burger', description: 'Premium beef with truffle', price: 24, category: 'Mains', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800' },
    { id: 2, name: 'Saffron Paella', description: 'Seafood delight', price: 32, category: 'Mains', image_url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800' },
    { id: 3, name: 'Tuna Tartare', description: 'Fresh and spicy', price: 16, category: 'Starters', image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800' },
    { id: 4, name: 'Lava Cake', description: 'Molten chocolate center', price: 12, category: 'Desserts', image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800' },
];

export default function Menu() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState(["All"]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            if (res.data && res.data.length > 0) {
                setProducts(res.data);
                const uniqueCategories = ["All", ...new Set(res.data.map(p => p.category))];
                setCategories(uniqueCategories);
            } else {
                // Fallback to mock if empty
                setProducts(MOCK_PRODUCTS);
                setCategories(["All", ...new Set(MOCK_PRODUCTS.map(p => p.category))]);
            }
        } catch (err) {
            console.error("Failed to fetch products, using mock data", err);
            setProducts(MOCK_PRODUCTS);
            setCategories(["All", ...new Set(MOCK_PRODUCTS.map(p => p.category))]);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        const matchesSearch = searchTerm === "" ||
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <section id="menu" className="py-20">
            <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-wider uppercase text-sm">Our Menu</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">Culinary Masterpieces</h2>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mt-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:bg-surface transition-all"
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-6 py-2 rounded-full font-medium transition-all duration-300 border border-white/10 backdrop-blur-sm hover:border-primary/50",
                                    selectedCategory === category
                                        ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                                        : "bg-surface/50 text-gray-400 hover:bg-surface hover:text-white"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center text-gray-400 py-12">
                            <p>No items found in this category.</p>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
