import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, removeCartItem, updateCartItemQuantity } from '../../redux/reducers/reducer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
            transform: 'translateY(-4px)',
        },
    },
    mediaContainer: {
        flex: 1,
    },
    media: {
        width: '100%',
        height: '15rem',
        objectFit: 'contain',
    },
    content: {
        padding: theme.spacing(2),
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
    },
    quantityContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
}));

function ItemCard({ item, onView }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.product.cart);

    // Find the item in the cart to get its count
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    const initialQuantity = cartItem ? cartItem.quantity : 0;

    const [quantity, setQuantity] = useState(initialQuantity);

    const handleAddToCart = () => {
        if (quantity === 0) {
            dispatch(addCartItem({ ...item, quantity: 1 }));
            setQuantity(1);
        } else {
            dispatch(updateCartItemQuantity({ itemId: item.id, quantity: quantity + 1 }));
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            dispatch(updateCartItemQuantity({ itemId: item.id, quantity: quantity - 1 }));
            setQuantity(quantity - 1);
        }
        if (quantity <= 1) {
            dispatch(removeCartItem(item));
        }
    };

    return (
        <Card className={classes.root}>
            <div className={classes.mediaContainer}>
                <img className={classes.media} src={item.image} alt={item.title} />
            </div>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="h6" component="h2">
                    {item.title}
                </Typography>
            </CardContent>
            <div className={classes.cardActions}>
                <Typography variant="body1" color="textPrimary">
                    ${item.price}
                </Typography>
            </div>
            <div className={classes.cardActions}>
                {quantity > 0 ? (
                    <div className={classes.quantityContainer}>
                        <Button size="small" color="primary" onClick={handleDecrease}>
                            -
                        </Button>
                        <Typography variant="body1" color="textPrimary">
                            {quantity}
                        </Typography>
                        <Button size="small" color="primary" onClick={handleAddToCart}>
                            +
                        </Button>
                    </div>
                ) : (
                    <Button size="small" color="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                )}
                <Button size="small" color="primary" onClick={onView}>
                    View
                </Button>
            </div>
        </Card>
    );
}

export default ItemCard;
