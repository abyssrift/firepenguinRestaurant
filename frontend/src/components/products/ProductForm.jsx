import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save, RotateCcw } from 'lucide-react';

const ProductForm = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState(product || {
        name: '',
        description: '',
        price: '',
        category: 'Main',
        imageURL: '',
        avaliable: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const STORAGE_KEY = 'pending_product';

    // Load persisted data on mount (only for new products)
    useEffect(() => {
        if (!product?.id) {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                try {
                    setFormData(JSON.parse(savedData));
                } catch (e) {
                    console.error('Failed to parse saved product data', e);
                }
            }
        }
    }, [product]);

    // Save data to localStorage on change (only for new products)
    useEffect(() => {
        if (!product?.id) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        }
    }, [formData, product]);

    const handleReset = () => {
        if (window.confirm('Are you sure you want to clear all fields?')) {
            const initialData = {
                name: '',
                description: '',
                price: '',
                category: 'Main',
                imageURL: '',
                avaliable: true
            };
            setFormData(initialData);
            if (!product?.id) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (product?.id) {
                await axios.put(`/api/products/${product.id}`, formData);
            } else {
                await axios.post('/api/products', formData);
                // Clear persistence after successful creation
                localStorage.removeItem(STORAGE_KEY);
            }
            onSave();
            onClose();
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Failed to save product');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">
                        {product?.id ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                rows="2"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                                <input
                                    required
                                    type="number"
                                    step="0.01"
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Main">Main</option>
                                    <option value="Sides">Sides</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Dessert">Dessert</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Image</label>

                            <div className="flex items-center space-x-4 mb-2">
                                <div className="flex-1">
                                    <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-xl inline-flex items-center w-full justify-center transition-colors">
                                        <span className="mr-2">📂 Upload File</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (!file) return;

                                                const formData = new FormData();
                                                formData.append('image', file);

                                                try {
                                                    // Show simple loading state if you want, or just wait
                                                    const res = await axios.post('/api/upload', formData, {
                                                        headers: { 'Content-Type': 'multipart/form-data' }
                                                    });
                                                    setFormData(prev => ({ ...prev, imageURL: res.data.imageUrl }));
                                                } catch (err) {
                                                    console.error('Upload failed', err);
                                                    alert('Image upload failed. Please try again.');
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <span className="text-gray-400 text-sm">OR</span>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Paste URL..."
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                        value={formData.imageURL}
                                        onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
                                    />
                                </div>
                            </div>

                            {formData.imageURL && (
                                <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden border">
                                    <img
                                        src={formData.imageURL}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, imageURL: '' })}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2 py-2">
                            <input
                                type="checkbox"
                                id="avaliable"
                                className="w-5 h-5 accent-primary-600 rounded"
                                checked={formData.avaliable}
                                onChange={(e) => setFormData({ ...formData, avaliable: e.target.checked })}
                            />
                            <label htmlFor="avaliable" className="text-sm font-semibold text-gray-700 cursor-pointer">
                                Available for Order
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 border-t flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reset Form"
                        >
                            <RotateCcw size={16} />
                            <span>Reset</span>
                        </button>
                        <div className="flex space-x-3 flex-1 ml-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-200 flex items-center justify-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        <span>{product?.id ? 'Update' : 'Create'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
