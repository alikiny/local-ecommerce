import { ADD_ORDER_ID } from "../../constant";

import { ActionTypes } from "./action";

type InitialState = {order: string[]}

const initialState: InitialState = {
    order: [],
}
const reducer = (state =initialState, actions: ActionTypes) => {
switch (actions.type) {
    case ADD_ORDER_ID:
        const orderId = actions.payload
        return {...state, order:[...state.order, {orderId}] }

    default:
        return state;
}


}

export default reducer