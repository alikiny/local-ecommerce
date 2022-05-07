import axios from "axios";
import { Dispatch } from "redux";
import { FETCHING_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from "../../constant";
import { ProductType, Error } from "../../types";

export const fetchProducts = () => {
return async(dispatch: Dispatch) => {   
    try {
        dispatch({
            type:FETCHING_PRODUCTS
        })
        const response = await axios.get('/product')
        dispatch(fetchProductsSuccess(response.data))
    } catch (error: any) {
        dispatch(fetchProductsError(error))
    }
}
};

export const fetchProductsSuccess = (data: ProductType) => {
return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data
}
}

export const fetchProductsError = (error: Error)=>{
    return {
        type: FETCH_PRODUCTS_ERROR,
        payload: error
    }
}

type FetchProductAction = {
    type: typeof FETCHING_PRODUCTS
}
type FetchProductSuccessAction = {
    type:typeof FETCH_PRODUCTS_SUCCESS,
    payload: ProductType[]
}
type FetchProductErrorAction = {
    type: typeof FETCH_PRODUCTS_ERROR,
    payload: string
}
export type Action = FetchProductAction | FetchProductSuccessAction | FetchProductErrorAction