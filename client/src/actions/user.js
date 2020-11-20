export const actionLogin = (user)=>{
    return {
        action: "LOGIN",
        payload: user,
    }
}
export const signUp = (user)=>{
    return {
        action: "SIGN_UP",
        payload: user,
    }
}
export const logOut = ()=>{
    return {
        action: "LOG_OUT"
    }
}
export const updateUser = (user)=>{
    return{
        action: "UPDATE",
        payload: user
    }
}