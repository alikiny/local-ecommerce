import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { Wrapper } from "./Cart.styles";
import CartItem from './cartItem/CartItem'
import { InitialState } from '../../redux/store';
import Button from '@mui/material/Button'
import axios from 'axios';

const Cart = () => {
    const cart = useSelector(((state: InitialState)=> state.cart.cart));
    const userId = useSelector((state: InitialState) => state.auth.user?._id)
    const [pageLoad, setPageLoad] = useState(false)
    
    let total: any =  [];
    let productsId: any = [];

    cart.forEach((item: any) => {
      const subtotal = item.product.price * item.itemQuantity

      productsId.push(item.product._id)

      return total.push(subtotal) 
    }
    )

    const calculateTotal = (items: any) =>
    items.reduce((acc: number, item: number) => acc + item, 0);

   const handleCheckOut = async(productsId: any,  userId: any)=> {
     // check whether cart is empty
      if (productsId.length === 0) {alert("Please first add product to cart")}
    // before processing check out user must login
      if(!userId) {alert('Please Login to checkout products in your cart')} else {
        const response =await axios.post('/order', {product: productsId, user: userId })
        alert(`you are ${response.data} checkout`)
        localStorage.removeItem('cart')  
  }}
    
  useEffect(()=> {
    const cartValue = localStorage.getItem('cart')
    if(!cartValue ) {
      setPageLoad(!pageLoad)
    }
  },[pageLoad])


    return (
      <div style={{display:"flex"}}>
        <Wrapper>
        <h2>Your Cart</h2>
        {cart.length === 0 ? <p>No items in cart.</p> : null}
        {cart.map((item: any) => (
          <CartItem
            key={item.product._id}
            item={item}
          />
        ))}
        <h2>Total: ${calculateTotal(total).toFixed(2)}</h2>
      </Wrapper>
      <Wrapper>
        <h3>Check Out</h3>
        <Button variant="contained" onClick={() => handleCheckOut(productsId, userId )}>Checkout</Button>
      </Wrapper>
      </div>
    );
};

export default Cart;