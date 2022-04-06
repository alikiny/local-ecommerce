import React from 'react';

import Grid from '@mui/material/Grid'
import ProductCard from './ProductCard';


const DiplayProducts = () => {

    return (
        <Grid container spacing={3} sx={{width: "84%"}} >
           <ProductCard /> 
        </Grid>
    );
};

export default DiplayProducts;