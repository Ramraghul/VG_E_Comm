import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/header/Header';
import HomePage from './components/home/Home';
import ProductsPage from './components/product/Product';
import ItemDescriptionPage from './components/description/Description';
import CartPage from './components/cart/Cart';
import OrdersPage from './components/orders/Orders';


//App Route
const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/category/:category" element={<ProductsPage />} />
                <Route path="/item/:category/:id" element={<ItemDescriptionPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
