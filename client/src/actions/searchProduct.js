export const searchProductAction = (searchObject)=>{
    return{
        type: 'SEARCH',
        payload: searchObject
    }
}