import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import { addCartItem, removeCartItem, updateCartItemQuantity } from '../../redux/reducers/reducer';
import { placeOrder } from '../../redux/actions/productAction';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    leftSide: {
        flex: '0 0 70%',
    },
    rightSide: {
        flex: '0 0 25%',
    },
    card: {
        marginTop: '1rem',
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[5],
        minHeight: '50px',
        width: '100%',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '40%',
        objectFit: 'contain',
    },
    description: {
        marginTop: theme.spacing(2),
    },
    price: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(3),
    },
    quantityContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
}));

function Cart() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.product.cart);

    const handleAddToCart = (item) => {
        const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
        const quantity = cartItem ? cartItem.quantity + 1 : 1;
        dispatch(addCartItem({ ...item, quantity }));
    };

    const handleDecrease = (item) => {
        const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
        const quantity = cartItem ? cartItem.quantity - 1 : 0;
        if (quantity > 0) {
            dispatch(updateCartItemQuantity({ itemId: item.id, quantity }));
        } else {
            dispatch(removeCartItem(item));
        }
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        let order = {
            totalItems: 0,
            totalPrice: 0,
            products: []
        };

        order.totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        order.totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        cartItems.forEach(item => {
            const itemData = {
                id: item.id,
                title: item.title,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                totalPrice: item.price * item.quantity
            };
            order.products.push(itemData);
        });

        dispatch(placeOrder(order));

        Swal.fire({
            icon: 'success',
            title: 'Order Placed Successfully!',
            text: 'Thank you for your order.',
            showConfirmButton: false,
            timer: 2000
        });
    };






    return (
        <Container className={classes.container}>
            <div className={classes.leftSide}>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map(item => (
                        <Card key={item.id} className={classes.card}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} md={4} className={classes.imageContainer}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={classes.image}
                                    />
                                </Grid>
                                <Grid item xs={8} md={8}>
                                    <CardContent>
                                        <Typography variant="subtitle1" component="h2">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                                            {item.description}
                                        </Typography>
                                        <Typography variant="subtitle2" component="p" className={classes.price}>
                                            Item Per: ${item.price}
                                        </Typography>
                                        <Typography variant="subtitle2" component="p" className={classes.price}>
                                            Total Price: ${item.price * item.quantity}
                                        </Typography>
                                        <div className={classes.quantityContainer}>
                                            <Button size="small" color="primary" onClick={() => handleDecrease(item)}>
                                                -
                                            </Button>
                                            <Typography variant="body1" color="textPrimary">
                                                {item.quantity}
                                            </Typography>
                                            <Button size="small" color="primary" onClick={() => handleAddToCart(item)}>
                                                +
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    ))
                )}
            </div>
            <div className={classes.rightSide}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Total Price: $ {total}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
                        </Typography>
                        <Button onClick={handlePlaceOrder} variant="contained" style={{ justifyContent: 'center', alignContent: 'center', marginLeft: '4rem' }} color="primary" className={classes.button}>
                            Place Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
}

export default Cart;
