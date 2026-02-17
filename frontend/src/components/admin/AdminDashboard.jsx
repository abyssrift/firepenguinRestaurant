import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductForm from '../products/ProductForm';

const AdminDashboard = ({ products, fetchProducts }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product');
            }
        }
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center text-gray-600 hover:text-primary-600 font-bold transition-colors">
                        <ArrowLeft className="mr-2" size={20} /> Back to Restaurant
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Restaurant Admin</h1>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-primary-700 shadow-md transition-all"
                    >
                        <Plus size={20} />
                        <span>Add Product</span>
                    </button>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 border-r">Product</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 border-r">Category</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 border-r">Price</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 border-r text-center">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 border-r">
                                        <div className="flex items-center space-x-4">
                                            {product.imageURL ? (
                                                <img src={product.imageURL} alt={product.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                    <ImageIcon size={20} />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{product.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-r text-sm">
                                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium uppercase text-xs">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-r font-bold text-gray-900">
                                        ${product.price ? product.price.toFixed(2) : '0.00'}
                                    </td>
                                    <td className="px-6 py-4 border-r text-center">
                                        {product.avaliable ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold uppercase">Available</span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold uppercase">Sold Out</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => openEdit(product)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No products available. Click "Add Product" to get started.
                        </div>
                    )}
                </div>
            </main>

            {isFormOpen && (
                <ProductForm
                    product={editingProduct}
                    onClose={closeForm}
                    onSave={fetchProducts}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
