import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { Wrapper } from "./Cart.styles";
import CartItem from './cartItem/CartItem' 
import { InitialState } from '../../redux/store';
import Button from '@mui/material/Button'
import axios from 'axios';


const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector(((state: InitialState)=> state.cart.cart));
  const userId = useSelector((state: InitialState) => state.auth.user?._id)
    
    let total: any =  [];
    let productsId: any = [];
    let itemQuant: any = []

    cart.forEach((item: any) => {
      const subtotal = item.product.price * item.itemQuantity
      productsId.push(item.product._id)
      itemQuant.push(item.itemQuantity)
      return total.push(subtotal) 
    })

    // calculate total function
    const calculateTotal = (items: any) =>
    items.reduce((acc: number, item: number) => acc + item, 0);


   const handleCheckOut = async(productsId: any,  userId: any)=> {
     // check whether cart is empty
      if (productsId.length === 0) {
        alert("Please first add product to cart")
        return navigate( '/')
      }
    // before processing check out user must login
      if(!userId) {
        alert('Please Login to checkout products in your cart')
        return navigate( '/login')
      } 
      else {
        const response =await axios.post('/order', {product: productsId, user: userId })
        alert(`you are ${response.data} checkout`)
        localStorage.removeItem('cart') 
        // console.log(localStorage.getItem('cart'))
        // dispatch(updateCart())
      }
}

    return (
      <div style={{display:"flex", justifyContent: "space-between"}}>
        
        <Wrapper>
        <h2>Your Cart</h2>
        {cart.length === 0 ? <p>No items in cart.</p> : null}
        {cart.map((item: any) => (
          <CartItem
            key={item.product._id}
            item={item}
          />
        ))}
        
        <h2>item: {calculateTotal(itemQuant)} </h2>
        <h2>Total: ${calculateTotal(total).toFixed(2)}</h2>
      </Wrapper>
      <Wrapper>
        <div style={{backgroundColor: "grey", padding: "2rem", height: "auto"}}>
          <h2> Order Summary</h2>
          <hr />
          <div style={{display: "flex", justifyContent: "space-between", paddingBottom: "2rem"}}>
            <p>ITEMS -  {calculateTotal(itemQuant)}</p>
            <p>${calculateTotal(total).toFixed(2)}</p>
          </div>
          <div>
              <p style={{paddingBottom: "2rem"}}>SHIPPING</p>
            <select style={{margin: "0 0 2rem 5rem"}} >
              <option>Standard Delivery - € 5.00</option>
              <option>Express Delivery - € 10.00</option>
              <option>Standard Delivery - € 15.00</option>
            </select>
            </div>
          <Button variant="contained" onClick={() => handleCheckOut(productsId, userId )}>Checkout</Button>
        </div>
        
      </Wrapper>
      </div>
    );
};

export default Cart;