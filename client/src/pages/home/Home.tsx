import React from 'react';
import DisplayProducts from '../../components/products/DiplayProducts'
import LeftNavigation from '../../components/products/LeftNavigation';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import './Home.css'

const Home = () => {
    
    return (
        <Paper className='homepage-container'>
            <LeftNavigation />
            <DisplayProducts /> 
        </Paper>
    );
};

export default Home;