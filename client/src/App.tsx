import React from 'react';
import axios from 'axios'

import './App.css';
import GoogleLogin from 'react-google-login'
function App() {

  const responseGoogle = async(response: any) =>{
    console.log(response);
    const tokenId = response?.tokenId
    const res = await axios.post('/user/google-login', {id_token : tokenId})
    
  const {user, token} = res.data 
localStorage.setItem('access_token', token, )
console.log(user)
}

axios.get('/product')

  return (
    <div className="App">
     <GoogleLogin
     clientId='476465246963-7ndvbj6rjgsimcmi3hb6liidqfcmuqgs.apps.googleusercontent.com'
     buttonText='Login'
     onSuccess={responseGoogle}
     onFailure={responseGoogle}
     ></GoogleLogin>
    </div>
  );
}

export default App;
