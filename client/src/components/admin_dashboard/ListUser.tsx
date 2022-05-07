import React, {useEffect, useState} from 'react';
import { UserType } from '../../types';
import axios from 'axios';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';

const ListUser = () => {
    const [users, setUsers] = useState<UserType[]>()
    const titles = ["First Name", "Last Name", "email", "Address", "Phone no.", "User", ""]

    useEffect(()=> {
        async function fetchData() {
            const data = await axios.get('/user/all')
            setUsers(data.data);
        }
        fetchData()
    }, [setUsers])

    
    return (
        <Paper>
            <h1>list product</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {titles?.map((title) => {
                                return(
                                    <TableCell key={title}>{title}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) =>  <TableRow key={user.email}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.profile.address}</TableCell>
                            <TableCell>{user.profile.phone}</TableCell>
                            <TableCell>{user?.isAdmin ? "Admin": "Not an Admin"}</TableCell>
                            <TableCell><button>View</button></TableCell>
                            
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>  
        </Paper>
    );
};

export default ListUser;