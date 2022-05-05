import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import GoogleLogIn from '../../components/GoogleLogIn';
import { loginSuccess } from '../../redux/auth/action';
import axios from 'axios'

import './SignUpPage.css'

const SignUpPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onSignUpClicked = async() => {
        const res = await axios.post('/user/sign-up', {
                firstName: firstName,
                lastName: lastName,
                email: emailValue,
                password: passwordValue    
            })

        const {user, token} = res.data 
        if(user) {
            localStorage.setItem('access_token', token)
            localStorage.setItem('auth', 'true' )
            dispatch(loginSuccess(user))
            alert('Account created Success')
            navigate('/')
        } else {
            alert('Account creation unSuccess')
        }
    }

    return (
        <div className='content-container'>
             <h1>Create your accoount</h1>
            {errorMessage && 
                <div className="fail">{errorMessage}</div>}
             <hr />
             <GoogleLogIn />
             <hr className='hr-text' data-content="OR" />
             <input 
                value={firstName}
                onChange={e => setFirstName(e.target.value)} 
                type="firstName" 
                placeholder='First Name' />
            <input 
                value={lastName}
                onChange={e => setLastName(e.target.value)} 
                type="lastName" 
                placeholder='Last Name' />
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
            <input
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}  
                type="password" 
                placeholder='Confirmed password' />
                <hr/>
            <button 
                disabled={!emailValue || !passwordValue || 
                passwordValue !== confirmPasswordValue}
                onClick={onSignUpClicked}>Sign Up</button>
            <button 
                onClick={()=> navigate('/login')} >Already have an account? Log In</button>
            
        </div>
    );
};

export default SignUpPage;