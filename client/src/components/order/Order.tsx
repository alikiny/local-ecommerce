import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

import {ProductType, UserType} from '../../types'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';

type OrderType = {
    product: ProductType[],
    user: UserType
}
const Order = () => {
    const {id} = useParams();
    const [ orders, setOrder] = useState<OrderType>()

    console.log(id)
    useEffect(()=> {
       async function myOrder () {

            const response = await axios.get(`/order/${id}`)
            return setOrder(response.data)
        }
        myOrder()
    
}, [setOrder, id])
    return (
        <div>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {orders?.product?.map((order) => (
                    <TableRow key={order._id}>
                        <TableCell><img src={order.image} style={{width:" 100px", height: "100px"}} alt="shoe"/></TableCell>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>{order.SKU}</TableCell>
                        <TableCell>{order.category.category}</TableCell>
                        <TableCell>{order?.color?.map((col)=> (<p>{col.color}</p>) )}</TableCell>
                        <TableCell>{order.size}</TableCell>
                        <TableCell>{order.price}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Order;