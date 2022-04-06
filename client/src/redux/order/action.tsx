import { ADD_ORDER_ID } from "../../constant";

export const addOrder = (order: string) => {
    return {
        type: ADD_ORDER_ID,
        payload: order
    }
}

type AddOrderIdType = {
    type: typeof ADD_ORDER_ID,
    payload: string
}

export type ActionTypes = AddOrderIdType 