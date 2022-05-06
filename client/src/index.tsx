import ReactDOM from 'react-dom';
import axios from 'axios'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import storeFactory from './redux/store';


// it respond with request and response
axios.interceptors.request.use((request)=> {
  const token = localStorage.getItem('access_token')
  // check the token exist in local storage
  if(token) {
    request.headers = {Authorization: `Bearer ${token}`
  }}

  return request
})
// get api url form env file.
axios.defaults.baseURL = process.env.REACT_APP_BACKEND

ReactDOM.render(
  <Provider store = {storeFactory}>
 <BrowserRouter>
    <App />
 </BrowserRouter>
 </Provider>, 
  document.getElementById('root')
);


