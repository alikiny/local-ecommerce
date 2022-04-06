
import {UserType} from '../../types'
import {LOGIN_SUCCESS, LOGOUT} from '../../constant'



export const loginSuccess = (user:UserType): LoginSuccessAction=> {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}


export const logout = (): LogoutAction=> {
return {
    type: LOGOUT
}
}

type LoginSuccessAction = {
    type: typeof LOGIN_SUCCESS,
    payload: UserType
}
type LogoutAction = {
    type:typeof LOGOUT
    
}

export type ActionType = LoginSuccessAction | LogoutAction