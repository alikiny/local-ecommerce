import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ite respond with request and response
axios.interceptors.request.use((request)=> {
  const token = localStorage.getItem('access_token')
  // check the token exist in local storage
  if(token) {
    request.headers = {Authorization: `Bearer ${token}`
  }}

  return request
})
axios.defaults.baseURL = 'http://localhost:5000/api/v1'

ReactDOM.render(
 
    <App />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
