import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Badge } from '@material-ui/core';
import { ShoppingCart, ListAlt } from '@material-ui/icons';

const Header = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.product.cart);

    const navigateToCart = () => {
        navigate('/cart')
    };

    const navigateToOrderList =()=>{
        navigate('/orders')
    }

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <div style={{ position: 'relative' }}>
            <AppBar position="static" style={{ backgroundColor: 'InactiveBorder', boxShadow: 'none' }}>
                <Toolbar>
                <h2 style={{ marginRight: '20px', cursor: 'pointer' }} onClick={navigateToHome}>Product</h2>

                    <div style={{ flexGrow: 1 }} />

                    <IconButton edge="end" color="inherit" style={{ marginRight: '10px' }} onClick={navigateToCart}>
                        <Badge badgeContent={cartItems.length === 0 ? "0" : cartItems.length} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <IconButton edge="end" color="inherit" onClick={navigateToOrderList}>
                    <ListAlt />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
