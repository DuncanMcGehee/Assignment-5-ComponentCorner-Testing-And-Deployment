import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const defaultProducts = [
  { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://placehold.co/600x400", description: "Premium noise-cancelling headphones with 30-hour battery life" },
  { id: 2, name: "Smart Watch", price: 249.99, image: "https://placehold.co/600x400", description: "Fitness tracker with heart rate monitor and GPS" },
  { id: 3, name: "Bluetooth Speaker", price: 79.99, image: "https://placehold.co/600x400", description: "Portable waterproof speaker with 360-degree sound" },
  { id: 4, name: "Laptop Stand", price: 49.99, image: "https://placehold.co/600x400", description: "Ergonomic aluminum stand for laptops and tablets" },
  { id: 5, name: "Webcam", price: 129.99, image: "https://placehold.co/600x400", description: "4K webcam with auto-focus and noise reduction" },
  { id: 6, name: "Mechanical Keyboard", price: 159.99, image: "https://placehold.co/600x400", description: "RGB backlit keyboard with custom switches" }
];

function App() {
  const products = defaultProducts;

  // Load cart from localStorage safely. Fall back to an empty cart if
  // storage is blocked, the JSON is malformed, or the value isn't an array.
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('componentcorner-cart');
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.warn('Could not load cart from localStorage:', error);
      return [];
    }
  });

  // Keep localStorage in sync whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('componentcorner-cart', JSON.stringify(cart));
    } catch (error) {
      console.warn('Could not save cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remove a single cart item by its position in the array
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((item, index) => index !== indexToRemove));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header storeName="GameVault" cartCount={cart.length} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetailsPage products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer storeName="GameVault" email="support@gamevault.com" phone="(555) 123-4567" />
      </div>
    </BrowserRouter>
  );
}

export default App;