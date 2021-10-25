import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import cartReducer from "./cart";

export default combineReducers({
    auth: userReducer,
    cart: cartReducer,
});
