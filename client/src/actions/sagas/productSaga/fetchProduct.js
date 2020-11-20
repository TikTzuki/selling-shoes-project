const { Call } = require("@material-ui/icons")

const fetchProductApi = (delay) => {
    return resolse => {
        setTimeout(()=>{
            resolse([
                'data array'
            ])
        }, delay)
    }
}

function* fetchProduct(){
    try {
        const response = yield Call(fetchProductApi, 1000);
        yield put({type: 'GET_PRODUCTS', payload: response});
    } catch(err){
        yield put({type: 'GET_PRODUCTS_ERROR'});
    }
}

export function* watchFetchProduct(){
    
}