export const getProducts=(products)=>{
    return {
        type: 'GET_PRODUCTS',
        payload: products
    }
}
export const getProductsPending=()=>{
    return {
        type: 'GET_PRODUCTS_PENDING',
    }
}
export const getProductsError=(error)=>{
    return {
        type: 'GET_PRODUCTS_ERROR',
        payload: error
    }
}