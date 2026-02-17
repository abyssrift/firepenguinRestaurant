import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Utensils, ShoppingCart, User, LogOut } from 'lucide-react';

const Sidebar = ({ cartCount }) => {
    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/', icon: Utensils, label: 'Menu' }, // Currently Home and Menu are same
        { path: '/checkout', icon: ShoppingCart, label: 'Cart', badge: cartCount },
        { path: '/admin', icon: User, label: 'Admin' },
    ];

    return (
        <aside className="bg-white w-64 h-screen sticky top-0 border-r border-gray-100 hidden md:flex flex-col shadow-sm font-sans z-50">
            <div className="p-8 flex items-center space-x-3">
                <div className="bg-primary-600 p-2 rounded-xl">
                    <Utensils className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-extrabold text-gray-900 tracking-tight">FirePenguin</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 pt-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive && item.path !== '/' // quick fix since home is root
                                ? 'bg-primary-50 text-primary-600 font-bold shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge > 0 && (
                            <span className="ml-auto bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t">
                <button className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors w-full rounded-xl hover:bg-red-50">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
