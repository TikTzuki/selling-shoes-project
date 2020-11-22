const initialState = {
    filter: ``,
    create_after: ``,
    create_before: ``,
    update_after: ``,
    update_before: ``,
    sku_seller_list: ``,
    search: ``,
    statement: ``
}

const searchProduct = (state = initialState, action) => {
	const payload = action.payload;
	switch (action.type) {
		case 'SEARCH':
			let statementTemp = ``;
			for (let prop in payload) {
				if (Object.prototype.hasOwnProperty.call(payload, prop)) {
					if (prop.includes('before') || prop.includes('after')) {
						statementTemp += Boolean(payload[`${prop}`]) ? `&${prop}=${payload[`${prop}`]}T00:00:00+08:00` : '';
					} else {
						if(prop.includes('sku_seller_list')){
							statementTemp += Boolean(payload[`${prop}`]) ? `&${prop}=[\"${payload[`${prop}`]}\"]` : '';
						} else {
							statementTemp += Boolean(payload[`${prop}`]) ? `&${prop}=${payload[`${prop}`]}` : '';
						}
					}
				}
			}
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