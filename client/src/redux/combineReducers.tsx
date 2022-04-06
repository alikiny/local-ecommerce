import { combineReducers } from "redux";
import productsReducer from './products/reducer'
import authReducer from './auth/reducer'
import cartReducer from './cart/reducer'
import userReducer from './order/reducer'
import categoryreducer from './category/reducer'

const rootReducer = combineReducers({
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer, 
    order: userReducer,
    category: categoryreducer,
})

export default rootReducer;