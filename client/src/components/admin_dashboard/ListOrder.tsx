import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ListOrder = () => {
    const [orderList, setOrderList] = useState<any[]>()
    const orderListTitle = ["User Name", "Product Name", "Order_Id"]

    useEffect(()=> {
        async function fetchData() {
            const data = await axios.get('/order/all')
            setOrderList(data.data)
        }
        fetchData()
    }, [setOrderList])
    console.log("order List:", orderList)
    return (
        <Paper>
            <h1>list order</h1>
            <TableContainer>
                <Table>
                   <TableHead>
                        <TableRow>
                            {orderListTitle?.map((title)=> {
                                return (
                                    <TableCell key={title}>{title}</TableCell>
                                )
                            } )}
                         </TableRow>
                    </TableHead> 
                   <TableBody>
                       {orderList?.map((list)=> 
                       <TableRow key={list._id}>
                           <TableCell>{list.user.firstName} {list.user.lastName}</TableCell>
                           <TableCell>{list?.product?.map((prod: any) => <li key={prod._id}>{prod.name}</li>)}</TableCell>
                            <TableCell>{list._id}</TableCell>
                       </TableRow>
                       )}
                   </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ListOrder;