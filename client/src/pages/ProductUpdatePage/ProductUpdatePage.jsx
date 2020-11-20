import React from 'react'
import { useParams } from 'react-router-dom';

const ProductUpdatePage = (props) => {
    console.log(`props`);
    console.log(props);
    return (
        <div>
            ProductUpdatePage
            {props.match.params.product_id}
        </div>
    )
}

export default ProductUpdatePage
