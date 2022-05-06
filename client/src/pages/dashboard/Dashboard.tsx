import React, {useState} from 'react';
import AdminNavBar from '../../components/admin_dashboard/AdminNavBar';
import CreateProduct from '../../components/admin_dashboard/CreateProduct';
import ListOrder from '../../components/admin_dashboard/ListOrder';
import ListProduct from '../../components/admin_dashboard/ListProduct';
import ListUser from '../../components/admin_dashboard/ListUser';
type DashboardType={
    createProduct: boolean
        listProduct: boolean
        listUser: boolean
        listOrder: boolean
}

const Dashboard = () => {
    const [value, setValue] = useState<DashboardType>({
        createProduct: true,
        listProduct: false,
        listUser: false,
        listOrder: false,
    })
    console.log(value)

    return (
        <div>
            <AdminNavBar  setValue={setValue}/>
            {value.createProduct ?<CreateProduct /> : null}
            {value.listProduct ?<ListProduct /> : null}
            {value.listUser ?<ListUser /> : null}
            {value.listOrder ?<ListOrder /> : null}
        </div>
    );
};

export default Dashboard;