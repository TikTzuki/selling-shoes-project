localStorage.setItem("override-user", `{
    "id": 1,
    "first_name": "long",
    "last_name": "tran",
    "phone_number": "0858267296",
    "email": "shenlong20119@gmail.com",
    "password": "00ab1b7b6708904653086417f8fbcd12",
    "laz_app_key": "ac",
    "laz_app_secret": "asc",
    "laz_access_token": "asdadw",
    "laz_access_expires": 30000,
    "laz_refresh_token": "asdafeafea",
    "laz_refresh_expires": 400000
}`)

let initialState = JSON.parse(localStorage.getItem("override-user"));

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            let currentUser = action.payload; 
            return {
                ...state,
                ...currentUser
            }
            
        case 'LOG_OUT':
            return null

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