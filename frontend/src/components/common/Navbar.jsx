import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Navbar = ({ cartCount, onCartClick }) => {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-primary-600 p-2 rounded-lg">
                        <span className="text-white font-bold text-xl">FP</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">Fire Penguin</span>
                </div>

                <button
                    onClick={onCartClick}
                    className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                    <ShoppingCart size={28} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
