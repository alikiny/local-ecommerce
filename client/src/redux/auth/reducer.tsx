import { LOGIN_SUCCESS, LOGOUT } from '../../constant';
import { UserType } from '../../types';
import { ActionType } from './action' 

type InitialState = {
    isAuthenticated: boolean,
    user: UserType | null
}
const initialState: InitialState = {
    isAuthenticated: false,
    user: null 
}

const authReducer = (state = initialState, actions: ActionType): InitialState => {
    switch (actions.type) {
        case LOGIN_SUCCESS:
            return {...state,
            isAuthenticated: true,
        user: actions.payload}

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }

        default:
            return state;
    }
}

export default authReducer