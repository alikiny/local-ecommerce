import { FETCHING_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from "../../constant";
import { ProductType } from "../../types";
import { Action } from "./action";


type InitialState = {
    products: ProductType[],
    loading: boolean,
    error: string,
}
const initialState: InitialState = {
    products: [],
    loading: false,
    error: "",
}

const reducer = (state= initialState, action: Action): InitialState => {
 
    switch (action.type) {
        case FETCHING_PRODUCTS:
            return {...state, loading: true, }
            
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, products: action.payload, loading: false}
    
        case FETCH_PRODUCTS_ERROR:
            return {...state, error: action.payload, loading: false}

        default:
            return state;
    }
};

export default reducer;