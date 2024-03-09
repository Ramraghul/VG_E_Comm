import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, fetchCategoryItems } from '../../redux/actions/productAction';
import { Card, CardContent, Typography, Grid, CircularProgress, makeStyles, CardMedia, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: theme.spacing(2),
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 12px 20px 0 rgba(0,0,0,0.2)',
            transform: 'translateY(-4px)',
        },
    },
    cardContent: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    categoryTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    cardMedia: {
        height: 200,
        backgroundSize: 'cover',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
}));

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories, loading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleClick = (category) => {
        dispatch(fetchCategoryItems(category));
        navigate(`/category/${category}`);
    };

    return (
        <div className="home-page">
            <h2>Categories</h2>
            {loading ? (
                <Container className={classes.loadingContainer}>
                    <CircularProgress />
                </Container>
            ) : (
                <Grid container spacing={2}>
                    {categories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={category}>
                            <Card onClick={() => handleClick(category)} className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={`https://source.unsplash.com/featured/?${category}`}
                                    title={category}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h5" component="h2" className={classes.categoryTitle}>
                                        {category}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}

export default Home;
