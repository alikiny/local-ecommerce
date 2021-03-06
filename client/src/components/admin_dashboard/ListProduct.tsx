import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { ProductType } from '../../types';

const ListProduct = () => {
    const [products, setProducts] = useState<ProductType[]>();
    const productTitles = ["Image", "Product Name", "SKU", "Price", "Size", "Gender", "Color", "Category", "Action"  ]

    useEffect(()=> {
        async function fetchData() {
            const data = await axios.get('/product')
            setProducts(data.data);
        }
        fetchData()
    }, [setProducts])

    return (
        <Paper>
            <h1>list product</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {productTitles?.map((productTitle) => {
                                return(
                                    <TableCell key={productTitle}>{productTitle}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((obj) =>  <TableRow key={obj._id}>
                            <TableCell><img 
                                src={obj.image}
                                style={{width: "100px", height:"100px"}} 
                                alt={obj.name} /></TableCell>
                            <TableCell>{obj.name}</TableCell>
                            <TableCell>{obj.SKU}</TableCell>
                            <TableCell>{obj.price}</TableCell>
                            <TableCell>{obj.size}</TableCell>
                            <TableCell>{obj.sex}</TableCell>
                            <TableCell>{obj.color.map((col) => <li key={col.color}>{col.color}</li>)}</TableCell>
                            <TableCell>{ obj?.category?.category}</TableCell>
                            <TableCell><button ><Link to={`/admin/dashboard/${obj._id}`}>View</Link></button></TableCell>
                            
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>  
        </Paper>
    );
};

export default ListProduct;