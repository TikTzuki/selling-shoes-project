import React from 'react'
import { useRouteMatch } from 'react-router-dom';
import ProductComp from '../../components/ProductComp/ProductComp'

function ProductPage() {
    return (
        <div>    
            <ProductComp/>
        </div>
    )
}

export default ProductPage
