import React from 'react';

const CategoryFilter = ({ activeCategory, setCategory }) => {
    const categories = ['All', 'Main', 'Sides', 'Drinks', 'Dessert'];

    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 
            ${activeCategory === cat
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
