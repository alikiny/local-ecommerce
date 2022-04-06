import React, {useEffect} from 'react';
import { useDispatch} from 'react-redux';
import {Routes, Route} from 'react-router-dom'

import Home from './pages/home/Home'
import ProfilePage from './pages/profile/ProfilePage';
import OrderPage from './pages/order/OrderPage';

import NavBar from './components/nav/NavBar'
import GoogleLogIn from './components/GoogleLogIn';

import { fetchProducts } from './redux/products/action';

import './App.css';
import CartPage from './pages/cart/CartPage';


function App()  {
const dispatch = useDispatch();


useEffect(()=>{
  dispatch(fetchProducts())
}, [dispatch])

  return (
    <div className="App">
     
    <NavBar />
    <Routes>
      <Route path= '/' element={<Home />}/>
      <Route path= '/cart' element={<CartPage />}/>
      <Route path= '/profile' element={<ProfilePage />}/>  
      <Route path= '/profile/:id' element={<OrderPage />}/>  
      <Route path= '/google-login' element={<GoogleLogIn />}/>

    </Routes>
    </div>
    
  );
}

export default App;
