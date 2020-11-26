export const actionLogin = (user)=>{
    return {
        type: "LOGIN",
        payload: user,
    }
}
export const signUp = (user)=>{
    return {
        type: "SIGN_UP",
        payload: user,
    }
}
export const logOut = ()=>{
    return {
        type: "LOG_OUT"
    }
}
export const updateUserAction = (user)=>{
    return{
        type: "UPDATE_PROFILE",
        payload: user
    }
}