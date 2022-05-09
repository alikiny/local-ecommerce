import React from 'react';
import {useDispatch} from 'react-redux'
import { Wrapper } from "./CartItem.styles";
import { addToCart, deleteProduct, removeFromCart } from '../../../redux/cart/action';

import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({item}: any) => {
  const dispatch = useDispatch()

  
    return (
      <Wrapper>
      <div>
        <h3>{item.product.name}</h3>
        <div className="information">
          <p>Price: ${item.product.price}</p>
          <p>Total: ${(item.product.price * item.itemQuantity)}</p>
        </div>
        <div className="buttons">
          <Button
          style={{marginRight: "30px"}}
            size="small"
            disableElevation
            variant="outlined"
            onClick={() => dispatch(removeFromCart(item.product._id))}
          >
            -
          </Button>
          <p>{item.itemQuantity}</p>
          <Button
          style={{marginLeft: "30px"}}
            size="small"
            disableElevation
            variant="outlined"
            onClick={() => dispatch(addToCart(item.product))}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.product.image} alt={item.product.name} />
      <div>
        <Button
            size="large"
            disableElevation
            variant="text"
            onClick={() => dispatch(deleteProduct(item.product._id))}
          >
            <DeleteIcon />
          </Button>
      </div>
      
    </Wrapper>
    );
};

export default CartItem;