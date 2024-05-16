import React, { useState, useEffect } from 'react';
import { tabAchat } from './../constant/page';
import "./Achat.css"
import { useDispatch, useSelector  } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../../lib/cartSlice';
import { APIURL } from '../../../lib/ApiKey';

function Achat({
    tabel_id,
    resto_id
}) {

    console.log("The Resto Id => ",resto_id);
    const cartItems = useSelector(state => 
        state.cart.items.filter(item => item.resto_id === resto_id)
    );
  const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  async function submitOrder(cartItems, totalCost) {
    let cartItemProduct = cartItems.map(item => {
        return {
            type: item.type,  // Assuming all items are dishes
            id: item.id,
            quantity: item.quantity
        };
    });
        

        const order = {
        total: totalCost,
        status: "new",
        table_id: tabel_id,  // Assuming static for now, you may need to adjust this based on your app's logic
        resto_id: resto_id,   // Assuming static as well, adjust accordingly
        cartItems: cartItemProduct
        };
    
        try {
        const response = await fetch(`https://backend.garista.com/api/order`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
    
        if (!response.ok) {
            const errorResponse = await response.text()
            throw new Error(`HTTP error ${response.status}: ${errorResponse}`);
        }
    
        const responseData = await response.json();
        console.log('Order submitted:', order,  cartItemProduct, responseData);
        // Handle post-order submission logic here, like clearing the cart or redirecting the user
        } catch (error) {
        console.error('Failed to submit order:', error.message);
        }
    }

    console.log("The Resto Cart => ", cartItems);
  
  return (
      <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <div>
              {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
              ))}
          </div>
          <div className="mt-4">
              <h3 className="text-lg">Total Cost: ${totalCost.toFixed(2)}</h3>
              <button onClick={() => submitOrder(cartItems, totalCost)} className="w-full bg-blue-500 text-white py-2 mt-4 rounded">CHECKOUT</button>
          </div>
      </div>
  );
}

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
      <div className="flex justify-between items-center my-2 p-2 border-b">
          <div className="flex items-center">
              <img src={`${APIURL}/storage/${item.image}`} alt={item.name} className="w-20 h-20 mr-4" />
              <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p>${item.price}</p>
              </div>
          </div>
          <div>
              <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
              <span className="mx-2">{item.quantity}</span>
              <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
          </div>
          <button onClick={() => dispatch(removeItem(item.id))} className="text-red-500">X</button>
      </div>
  );
}

export default Achat;
