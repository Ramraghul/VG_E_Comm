import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCategoryItemsById } from '../../redux/actions/productAction';
import { Container, Grid, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addCartItem, removeCartItem, updateCartItemQuantity } from '../../redux/reducers/reducer';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: '5rem',
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[5],
        minHeight: '200px',
        width: "95%"
    },
    image: {
        width: '100%',
        height: '16rem',
        objectFit: 'contain',
        marginTop: '3rem',
        borderTopLeftRadius: theme.spacing(2),
        borderTopRightRadius: theme.spacing(2),
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

function Description() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { description, loading } = useSelector(state => state.product);
    const cartItems = useSelector(state => state.product.cart);

    const cartItem = cartItems.find((cartItem) => cartItem.id === parseInt(id));

    const initialQuantity = cartItem ? cartItem.quantity : 0;

    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        dispatch(fetchCategoryItemsById(id));
    }, [id, dispatch]);

    const handleAddToCart = () => {
        if (quantity === 0) {
            dispatch(addCartItem({ ...description, quantity: 1 }));
            setQuantity(1);
        } else {
            dispatch(updateCartItemQuantity({ itemId: description.id, quantity: quantity + 1 }));
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            dispatch(updateCartItemQuantity({ itemId: description.id, quantity: quantity - 1 }));
            setQuantity(quantity - 1);
        }
        if (quantity <= 1) {
            dispatch(removeCartItem(description));
        }
    };


    return (
        <Container>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Grid container spacing={3} className={classes.card}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={description.image}
                            alt={description.title}
                            className={classes.image}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {description.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                                {description.description}
                            </Typography>
                            <Typography variant="h6" component="p" className={classes.price}>
                                Price: ${description.price}
                            </Typography>
                            <div>
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
                                    <Button variant="contained" color="primary" className={classes.button} onClick={handleAddToCart}>
                                        Add to Cart
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Grid>
                </Grid>
            )}
        </Container>
    )
}

export default Description;
