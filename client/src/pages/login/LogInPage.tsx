import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import GoogleLogIn from '../../components/GoogleLogIn';

import './LogInPage.css'

const LogInPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const navigate = useNavigate();

    const onLoginClicked = async() => {
    alert ('Log In not implemented')
    }

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && 
                <div className="fail">{errorMessage}</div>}
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