import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Menu from './components/Menu';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';

function HomePage() {
    return (
        <>
            <Hero />
            <Menu />
            <CartSidebar />
        </>
    );
}

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
        </CartProvider>
    );
}

export default App;
