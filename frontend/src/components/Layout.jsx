import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function LayoutContent() {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen bg-background text-gray-100 font-sans selection:bg-primary/30">
            <Navbar />
            <main className="pt-28 px-4 pb-12 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: theme === 'dark' ? '#18181b' : '#ffffff',
                        color: theme === 'dark' ? '#fff' : '#111827',
                        border: theme === 'dark' ? '1px solid #3f3f46' : '1px solid rgba(0, 0, 0, 0.1)',
                        boxShadow: theme === 'dark' ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                }}
            />
        </div>
    );
}

export default function Layout() {
    return (
        <ThemeProvider>
            <LayoutContent />
        </ThemeProvider>
    );
}
