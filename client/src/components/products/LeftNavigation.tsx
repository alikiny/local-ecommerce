import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import  Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { selectcategory } from '../../redux/category/action';

type CategoryType = {
    _id: string,
    category: string
}
const LeftNavigation = () => {
    const dispatch = useDispatch();
const [categories, setCategory] = useState<CategoryType[]>()

 const fetchCategory = async()=> {
        try {
            const response = await axios.get('/category')
            setCategory(response.data) 
        } catch (error) {
            console.log(error)
        }
        
    }
useEffect(()=>{
    fetchCategory()
}, [])
const handleChange = (category: string) => {
console.log(category)
dispatch(selectcategory(category))

}
    
    return (
        <Grid container sx={{width: "15%"}}>
            <Grid item xs={12} sx={{height:"100vh"}}>
               <Paper >
                
                <Typography variant="h3"  >Category</Typography>
              
                    {categories?.map((item: CategoryType ) => {
                        return( 
                            <div key={item.category}>
                            <Button 
                            variant='outlined'
                            sx={{width: "200px"}}
                            onClick={()=> handleChange(item.category)}   
                            >
                                 {item.category}
                            </Button>
                            </div>) 
                        })}
                        <Button 
                            variant='outlined'
                            sx={{width: "200px"}}
                            onClick={()=> handleChange('')}   
                            >
                                 Get All Products
                            </Button>
                    
                
                </Paper> 
            </Grid>     
        </Grid>
       
    );
};

export default LeftNavigation;