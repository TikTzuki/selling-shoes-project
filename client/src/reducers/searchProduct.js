const initialState = {
    name: ``,
    sellerSku: ``,
    filter: `inactive`,
    limit: `5`,
    statement: `true`
}

const searchProduct = (state = initialState, action)=>{
    const payload = action.payload;
    switch (action.type) {
        case 'SEARCH':
            let name = Boolean(payload.name)? payload.name : ``;
            let sellerSku = Boolean(payload.sellerSku)?payload.sellerSku : ``;
            let filter = Boolean(payload.filter)?payload.filter : ``;
            let statementTemp=``;
            statementTemp += Boolean(name)?`search=${name}`: ``;
            statementTemp += Boolean(sellerSku)? `&sku_seller_list=["${sellerSku}"]`:``;
            statementTemp += Boolean(filter)?`&filter=${filter}`:``;
            statementTemp += Boolean(state.limit)? `&limit=${state.limit}`:``;
            return {
                ...state,
                ...payload,
                statement: statementTemp
            }
        default:
            return state;
    }
}
export default searchProduct;