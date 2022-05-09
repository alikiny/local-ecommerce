import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import GoogleLogIn from '../../components/GoogleLogIn';
import { loginSuccess} from '../../redux/auth/action';
import axios from 'axios'

import './LogInPage.css'

const LogInPage = () => {
    // const [errorMessage, setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onLoginClicked = async() => {
        const res = await axios.post('/user/sign-in', { 
            email: emailValue,
            password: passwordValue    
        })
        const {foundUser, token} = res.data 
        if(foundUser) {
            localStorage.setItem('access_token', token)
            localStorage.setItem('auth', 'true' )
            dispatch(loginSuccess(foundUser))
            alert('Login Success')
            navigate('/')
        } else {
            alert('Login unSuccess')
        }
    }

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {/* {errorMessage && 
                <div className="fail">{errorMessage}</div>} */}
            <hr />
            <GoogleLogIn />
            <hr className='hr-text' data-content="OR"  />
            <input 
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)} 
                type="email" 
                placeholder='someone@gmail.com' />
            <input
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}  
                type="password" 
                placeholder='password' />
                <hr/>
            <button 
                disabled={!emailValue || !passwordValue}
                onClick={onLoginClicked}>Log In</button>
            <button 
                onClick={()=> navigate('/forgot-passwprd')}>Forget your password</button>
            <button 
                onClick={()=> navigate('/signup')} >Don't have an account? Sign Up</button>
        </div>
    );
};

export default LogInPage;