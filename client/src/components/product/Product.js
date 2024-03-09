import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCategoryItems, fetchCategoryItemsById } from '../../redux/actions/productAction';
import ItemCard from '../itemCard/ItemCard';
import { Grid, CircularProgress } from '@material-ui/core';

function Product() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { category } = useParams();
    const { categoryItems, loading } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchCategoryItems(category));
    }, [category, dispatch]);

    const handleView = (itemId) => {
        dispatch(fetchCategoryItemsById(itemId));
        navigate(`/item/${category}/${itemId}`);
    };

    return (
        <div className="product-page">
            <h2>{category}</h2>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    {categoryItems ? (
                        categoryItems.map(item => (
                            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                                <ItemCard
                                    item={item}
                                    onView={() => handleView(item.id)}
                                />
                            </Grid>
                        ))
                    ) : (
                        <p>No items found.</p>
                    )}
                </Grid>
            )}
        </div>
    );
}

export default Product;
