import React from 'react'
import { useParams } from 'react-router-dom';
import ProductUpdate from '../../components/ProductUpdate/ProductUpdate';

const ProductUpdatePage = (props) => {
    console.log(`props`);
    console.log(props);
    return (
        <div>
            Sửa sản phẩm: {props.match.params.product_id}
            <ProductUpdate product_id={props.match.params.product_id} />
        </div>
    )
}

export default ProductUpdatePage
