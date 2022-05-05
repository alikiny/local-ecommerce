import React from 'react';
import './AdminNavBar.css'

const AdminNavBar = () => {
    return (
        <div className='AdminNavBar-Container'>
            <ul >
                <li><button>Create Product</button></li>
                <li><button>List Product</button></li>
                <li><button>List User</button></li>
                <li><button>List Order</button></li>
                
            </ul>
        </div>
    );
};

export default AdminNavBar;