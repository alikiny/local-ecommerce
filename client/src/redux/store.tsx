import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./combineReducers"
import { ProductType, UserType } from "../types"

export type InitialState = {
    products: {products:ProductType[], loading: boolean, error: string},
    auth: {isAuthenticated: boolean, user: UserType | null},
    cart: {cart: ProductType[]},
    category: {category: string},
    
}

const initialState: InitialState = {
    products: {products:[], loading: false, error: ""},
    auth: {isAuthenticated: false, user: null} ,
    cart: {cart: []},
    category: {category: ''},
        
}

const storeFactory= ()=> {
    const cartItem = localStorage.getItem('cart')
    const auth = localStorage.getItem('user')
    if(cartItem){
        initialState.cart.cart = JSON.parse(cartItem)
    }
    if(auth){
        initialState.auth = JSON.parse(auth)
    }
    
   const store =  createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

   store.subscribe(()=> {
       const currentState = store.getState()

       const cartItems = currentState.cart.cart
       localStorage.setItem('cart', JSON.stringify(cartItems))

       const auth = currentState.auth
       localStorage.setItem('user', JSON.stringify(auth))

   })

    return store;
}

export default storeFactory();