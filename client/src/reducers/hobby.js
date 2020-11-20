
const initialState = {
    list: [],
    activeId: null,
}
const hobbyReducer = (state = initialState, action)=> {
    switch (action.type) {
        case 'ADD_HOBBY':
            const newList = [...state.list]
            console.log(newList)
            newList.push(action.payload);
            return {
                ...state,
                list: newList,
            };
            break;
        case 'SET_ACTIVE_HOBBY':
            return state;
            break;
        default:
            return state;
    }
}
export default hobbyReducer;