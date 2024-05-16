import { Outlet, useNavigate ,Link} from "react-router-dom";
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from 'react';
import { tabAchat } from './../constant/page';
import "./Achat.css"
import { useDispatch, useSelector  } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../../lib/cartSlice';
import { APIURL } from '../../../lib/ApiKey';

export default function Achat({
    tabel_id,
    resto_id
}) {

    console.log("The Resto Id => ",resto_id);
  const cartItems = useSelector(state => state.cart.items);
  const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  async function submitOrder(cartItems, totalCost) {
    let cartItemProduct = cartItems.map(item => {
        return {
            type: "dish",  // Assuming all items are dishes
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
  return (
    
    <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Shopping Cart</h2>
          <Link className="text-primary hover:underline dark:text-primary-400" href="#">
            Clear Cart
          </Link>
        </div>
        {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
              ))}
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Total:
            <span className="font-medium text-gray-900 dark:text-gray-50">  ${totalCost.toFixed(2)}</span>
          </p>
          <Button onClick={() => submitOrder(cartItems, totalCost)} className="bg-primary text-white py-2 px-4 rounded-lg" size="lg">
             Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
function CartItem({ item }) {
    const dispatch = useDispatch();
  
    return (
        <div className="grid gap-4">
          <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-16 h-16 rounded-md overflow-hidden">
              <img
                alt={item.name}
                className="w-full h-full object-cover"
                height={64}
                src={`${APIURL}/storage/${item.image}`}
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
                width={64}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-50">{item.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => dispatch(decrementQuantity(item.id))} size="icon" variant="outline">
                <MinusIcon className="w-4 h-4" />
              </Button>
              <span className="text-base font-medium text-gray-900 dark:text-gray-50">1</span>
              <Button onClick={() => dispatch(incrementQuantity(item.id))} size="icon" variant="outline">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => dispatch(removeItem(item.id))}
                className="text-red-500"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
    );
  }
function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}