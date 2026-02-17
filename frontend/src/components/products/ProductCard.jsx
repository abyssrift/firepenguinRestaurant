import React from 'react';
import { Plus } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={product.imageURL || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {!product.avaliable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold bg-gray-900 px-3 py-1 rounded-full uppercase text-xs">Sold Out</span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                    <span className="text-primary-600 font-bold">${product.price.toFixed(2)}</span>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
                    {product.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md uppercase">
                        {product.category}
                    </span>

                    <button
                        onClick={() => addToCart(product)}
                        disabled={!product.avaliable}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-bold text-sm transition-all
              ${product.avaliable
                                ? 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                        <Plus size={18} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
