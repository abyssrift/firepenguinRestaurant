import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function ProductCard({ product, index }) {
    const { addToCart } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(
            (t) => (
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Added <strong>{product.name}</strong> to cart</span>
                </div>
            ),
            {
                duration: 2000,
            }
        );
    };

    const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
        >
            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden relative bg-zinc-800">
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                <img
                    src={imageError ? fallbackImage : (product.image_url || fallbackImage)}
                    alt={product.name}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                    }}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">
                            {product.category}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-white group-hover:text-primary transition-colors duration-300">
                            {product.name}
                        </h3>
                    </div>
                    <span className="text-2xl font-bold text-white/90 ml-2">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </span>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description || 'A delicious culinary masterpiece crafted with premium ingredients.'}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-secondary hover:bg-primary text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
                    <span>Add to Order</span>
                </button>
            </div>

            {/* Premium Badge (if applicable) */}
            {product.price > 25 && (
                <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm text-zinc-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Premium
                </div>
            )}
        </motion.div>
    );
}
