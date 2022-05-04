import {Link, Route} from 'react-router-dom'

export const PrivateRoute = (props: any) => {
    const user = null;

    if (!user) return <Link to='/login' />

    return <Route {...props} />
}