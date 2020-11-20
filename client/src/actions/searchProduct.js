export const searchProduct = (searchObject)=>{
    return{
        type: 'SEARCH',
        payload: searchObject
    }
}