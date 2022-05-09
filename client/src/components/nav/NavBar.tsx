import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import './NavBar.css'

import { logout } from '../../redux/auth/action';
import { InitialState } from '../../redux/store';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    
  const checkAuthentication = useSelector((state: InitialState)=> state.auth.isAuthenticated)
  const checkAdmin = useSelector((state: InitialState)=> state.auth?.user?.isAdmin)
  const cartItems = useSelector((state: InitialState)=> state.cart.cart.length)

  const handleLogout = ()=> {
    dispatch(logout())
    localStorage.removeItem('access_token')
    localStorage.removeItem('auth')
    navigate('/')
  }

  return (
    <>
      <div className='main-nav'>
        <div className='logo'>
          <Link to='/'><h2>
          <span>Nike</span>
          <span>Sneakers</span>
          </h2>
          </Link>
          

        </div>
        <div className='menu-link'>
          <ul >
            {/* {!checkAuthentication ? 
            <GoogleLogin /> : 
            <button onClick={handleLogout}>Log-Out</button>
            } */}
            {checkAuthentication ? <Link to='/profile'>Profile</Link>: null}
            {checkAdmin ? <Link to='/admin/dashboard'>Dashboard</Link> : null}

            
            <Badge badgeContent={cartItems} color="secondary">
              <Link to="/cart">
                <ShoppingCartIcon />
              </Link>
            </Badge>
            {checkAuthentication ? <p onClick={handleLogout}>Log-Out</p> :<Link to='/login'>Log In</Link> }
            
            
          </ul>
        </div>
      </div>
      {/*  hero section*/}
      
      
    </>
  );
};

export default NavBar;    