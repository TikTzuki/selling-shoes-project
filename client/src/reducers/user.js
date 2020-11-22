let initialState = Boolean(JSON.parse(localStorage.getItem("seller-account"))) ? JSON.parse(localStorage.getItem("seller-account")): null;
console.log("init user",initialState);
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            let currentUser = action.payload; 
            return {
                ...state,
                ...currentUser
            }
            
        case 'LOG_OUT':
            return {}

        case 'UPDATE_PROFILE':
            currentUser = action.payload; 
            return {
                ...state,
                ...currentUser
            }
        
        case 'SIGN_UP':
            currentUser = action.payload; 
            return {
                ...state,
                ...currentUser
            }
        default:
            return state;
    }
    return state;
}
export default userReducer;