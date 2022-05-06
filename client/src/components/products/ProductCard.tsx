import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { InitialState } from '../../redux/store';


import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import { ProductType } from '../../types';
import { addToCart } from '../../redux/cart/action';

const ProductCard = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: InitialState)=> state.products.products)
    const category = useSelector((state: InitialState)=> state.category.category)
    

    const filteredProduct = products.filter((product)=>  {
        if(category === '') {
            return product
        }else {
            return product.category.category.includes(category)
        }
    } )


    const handleAddToCart = (product: ProductType)=> {
        dispatch(addToCart(product))
    }
    return (
               <>
                   {filteredProduct?.map((product, index)=> {
                        return(
                        <Grid key={index } item xs={4}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia 
                                    component="img"
                                    height="300"
                                    image={product.image}
                                    alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography component="h2" variant="subtitle1" color="text.secondary">{product.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{product.color?.map((shoeColor)=> <li key={shoeColor.color}>{shoeColor.color}</li>)}</Typography>
                                        <Box sx={{display: "flex"}}>
                                            <Typography  component="h6" variant="subtitle2">Category :</Typography>
                                        <Typography variant="body2" color="text.secondary" marginLeft={1}> {product.category.category}</Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                        <Button 
                                        onClick={()=> handleAddToCart(product)}
                                        size="small" color="primary">
                                        Add To Cart
                                        </Button>
                                </CardActions>
                            </Card> 
                        </Grid>
                   )})}
                   
                  </>  
               
           
    );
};

export default ProductCard;