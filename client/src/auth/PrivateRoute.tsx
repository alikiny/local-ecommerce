import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { InitialState } from '../redux/store'

export const PrivateRoute = ({children}: any) => {
    
    const checkAdmin = useSelector((state: InitialState)=> state.auth?.user?.isAdmin)

    if (!checkAdmin) return <Navigate to='/login' />

    return  children
}