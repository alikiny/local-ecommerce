
import { GET_CATEGORY } from '../../constant';
import { Actiontype } from './action';

type InitialState = {
    category: string}

const initialState: InitialState = {
    category: ''
}
const reducer = (state= initialState, actions: Actiontype) => {
   switch (actions.type) {
       case GET_CATEGORY:
           return {...state, category: actions.payload}
           
   
       default:
           return state;
   }
};

export default reducer;