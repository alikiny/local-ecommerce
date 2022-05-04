import React from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import { loginSuccess } from '../redux/auth/action';

const GoogleLogIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const responseGoogle = async(response: any) =>{
        const tokenId = response?.tokenId
        const res = await axios.post('/user/google-login', {id_token : tokenId})
        
        const {user, token} = res.data 
        if(user) {
            localStorage.setItem('access_token', token)
            localStorage.setItem('auth', 'true' )
            dispatch(loginSuccess(user))
            navigate('/')

        } else {
            alert('Login unSuccess')
        }

        console.log(user)
    }

    return (
        <div>
            <GoogleLogin
            clientId='476465246963-7ndvbj6rjgsimcmi3hb6liidqfcmuqgs.apps.googleusercontent.com'
            buttonText='Login'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
     ></GoogleLogin> 
        </div>
    );
};

export default GoogleLogIn;