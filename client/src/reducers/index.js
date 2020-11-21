import { combineReducers } from "redux";
import hobbyReducer from "./hobby";
import productReducer from "./product";
import searchLazorder from "./searchLazOrder";
import searchProduct from "./searchProduct";
import userReducer from "./user";

const rootReducer = combineReducers({
    hobby: hobbyReducer,
    user: userReducer,
    productsState: productReducer,
    searchProduct: searchProduct,
    searchLazOrder: searchLazorder
})

export default rootReducer;