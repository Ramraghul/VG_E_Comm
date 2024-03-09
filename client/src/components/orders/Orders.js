import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { fetchAllOrder } from '../../redux/actions/productAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    image: {
        width: 80,
        height: 80,
        objectFit: 'cover',
        borderRadius: '50%',
    },
    productCell: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    productName: {
        marginLeft: theme.spacing(2),
    },
}));

function OrderList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.product.orderList);

    useEffect(() => {
        dispatch(fetchAllOrder());
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>
            {orders.loading ? (
                <CircularProgress />
            ) : orders.error ? (
                <Typography variant="body1" color="error">
                    {orders.error}
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Total Items</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Products</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.totalItem}</TableCell>
                                    <TableCell>${order.totalPrice}</TableCell>
                                    <TableCell>
                                        <Table>
                                            <TableBody>
                                                {order.products.map((product) => (
                                                    <TableRow key={product.id}>
                                                        <TableCell className={classes.productCell}>
                                                            <img src={product.image} alt={product.title} className={classes.image} />
                                                            <Typography className={classes.productName}>{product.title}</Typography>
                                                        </TableCell>
                                                        <TableCell>${product.price}</TableCell>
                                                        <TableCell>{product.quantity}</TableCell>
                                                        <TableCell>${product.totalPrice}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default OrderList;
