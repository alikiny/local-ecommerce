import { ADD_TO_CART, DELETE_PRODUCT, REMOVE_FROM_CART, UPDATE_CART } from "../../constant"
import { ActionType } from "./action"

type InitialState = { cart: any}

const initialState: InitialState = {
cart: []

}

const reducer = (state= initialState, actions: ActionType ): InitialState => {
    switch (actions.type) {
        
        case ADD_TO_CART:
            const product = actions.payload
            // check cart is true when length is greater than 0 and find item by id
            const checkCart = state.cart.length > 0 && state.cart.find((item: any)=> (item?.product?._id === product._id))

            if(!checkCart) {
            return {...state, 
                    cart:[...state.cart, {product, itemQuantity:1}]
            }} else {
                return {
                    ...state,
                    cart: state.cart.map((item:any)=>
                        (item.product._id === product._id )? 
                        {...item, itemQuantity: item.itemQuantity + 1}: item
                    )}
            }

        case REMOVE_FROM_CART:       
                return {...state,
                    cart: state.cart.map((item: any)=> 
                    (item.product._id === actions.payload )? 
                    {...item, itemQuantity: item.itemQuantity > 1 ? item.itemQuantity -1 : 1}: item
                    )
                }
        
        case DELETE_PRODUCT:
            return {...state,
            cart: state.cart.filter((item: any)=> item.product._id !== actions.payload)
            }
        
        case UPDATE_CART:
            return {...state, cart: []}
    
        default:
            return state;
    }
}

export default reducer;