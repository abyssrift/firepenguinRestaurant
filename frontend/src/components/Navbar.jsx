import { motion } from 'framer-motion';
import { ShoppingBag, UtensilsCrossed, Moon, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { setIsCartOpen, cartCount, cartAnimation } = useCart();
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-surface/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-xl">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary rounded-lg group-hover:bg-primary-hover transition-colors">
                            <UtensilsCrossed className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-heading font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                            Fire Penguin
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" />
                            ) : (
                                <Moon className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
                            )}
                        </button>

                        {/* Cart Button */}
                        <motion.div
                            key={cartAnimation}
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, -10, 10, -10, 0]
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 hover:bg-white/5 rounded-full transition-colors group"
                            >
                                <ShoppingBag className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" />
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-surface"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
