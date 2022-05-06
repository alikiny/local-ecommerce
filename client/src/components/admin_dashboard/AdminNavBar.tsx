import React from 'react';
import './AdminNavBar.css'

type ValueType = {
    createProduct: boolean
    listProduct: boolean
    listUser: boolean
    listOrder: boolean
}


const AdminNavBar = (props:{setValue: (arg:ValueType) => void} ) => {

    const handleClick= (key: string): any => {
        if (key === "createProduct"){   
        props.setValue({
                createProduct: true,
                listProduct: false,
                listUser: false,
                listOrder: false,
            })}
       else if (key === "listProduct") {
        props.setValue({
            createProduct: false,
            listProduct: true,
            listUser: false,
            listOrder: false,
        })
       }
       else if (key === "listUser") {
        props.setValue({
            createProduct: false,
            listProduct: false,
            listUser: true,
            listOrder: false,
        })
       }
       else if (key === "listOrder") {
        props.setValue({
            createProduct: false,
            listProduct: false,
            listUser: false,
            listOrder: true,
        })
       }
    }

    return (
        <div className='AdminNavBar-Container'>
            <ul >
                <li><button onClick={() => handleClick('createProduct')} >Create Product</button></li>
                <li><button onClick={() => handleClick('listProduct')}>List Product</button></li>
                <li><button onClick={() => handleClick('listUser')}>List User</button></li>
                <li><button onClick={() => handleClick('listOrder')}>List Order</button></li> 
            </ul>
        </div>
    );
};

export default AdminNavBar;


