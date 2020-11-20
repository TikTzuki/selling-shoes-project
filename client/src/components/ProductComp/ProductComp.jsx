import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import TableProductCollapse from './TableProductCollapse/TableProductCollapse';
import TableProduct from './TableProduct/TableProduct';
import NavTabs from './NavTabs';
import SearchProduct from './SearchProduct';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
function ProductComp() {
    const [search, setSearch] = useState({
        name: ``,
        sellerSku: ``,
        shopSku: `3001`,
        statement: ``
    })
    useEffect(() => {
        "table product component did mount"
        return () => {

        }
    }, [])
    return (
        <div>
            <SearchProduct search={search} />
            <NavTabs search={search} />
        </div>
    );
}

export default ProductComp