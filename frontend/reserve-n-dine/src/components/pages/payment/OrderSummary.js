import React , { Component, useState }from 'react';
import Cart from "../Cart/Cart";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import { Button } from '../../Button';
import "./OrderSummary.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GrFormAdd, GrFormSubtract, GrPrevious, GrNext } from "react-icons/gr";
import Esewa from './Esewa';

const OrderSummary = (props) => {
const {handleproceed, orderItems ,calculateorderItemTotal,calculateOrderTotal }= props;
return (
        <>
        <OrderContent>
        <OrderHeader />
        <Update/>
        <OrderTable>
          {orderItems.map((orderItem,index) => (
            <OrderItem
            key= {index}
            //handleproceed= {handleproceed}
            orderItem= {orderItem}
            calculateorderItemTotal= {calculateorderItemTotal}
            />
          ))}
        </OrderTable>
        <OrderTotal orderTotal={calculateOrderTotal} />
        <Checkout/>
        </OrderContent>
        
      </>
    )
};

export default OrderSummary;


const OrderContent = (props) => {
  return <div className="cart-content">{props.children}</div>;
};

const OrderHeader = () => {
  return <div className="cart-header">Order Details</div>;
};

const Update = () => {
  return <Link to ="/cart" className="btn-link1">  
  <Button onclick={Cart} buttonStyle='btn--outline1' buttonSize='btn--mobile1'>
  Update your Cart
  </Button></Link>
};
  
const OrderTable = (props) => {
  return (
  <>
    <div className="cart-items-table">
      <table className="div-table">
        <thead className="div-head-row div-row cart-table-header">
          <th className="div-head-col div-col" colSpan="2">
            ITEM
          </th>
          <th className="div-head-col div-col">PRICE</th>
          <th className="div-head-col div-col">QTY</th>
          <th className="div-head-col div-col">TOTAL</th>
          <th className="div-head-col div-col"></th>
        </thead>
        {props.children}
     </table>
    </div>
  </>
  );
};


const OrderItem = (props) => {
  const { orderItem, calculateorderItemTotal } = props;
  const { name, cost, id, image, quantity } = orderItem || [];
  return (
    <tr className="div-row">
      <td className="div-col cart-item-img-container">
        <img className="cart-item-img" src={image} alt={name} />
      </td>
      <td className="div-col cart-item-name">{name}</td>
      <td className="div-col cart-item-price">Rs. {cost}</td>
      <td className="div-col cart-item-qty">
        {quantity}  </td>
      <td className="div-col cart-item-total">Rs. {calculateorderItemTotal(orderItem)}</td>
     
       
     
    </tr>
  );
};

const OrderTotal = ({orderTotal}) =>{
  return(
    <div className="cart-total">
      <div className="cart-total-header">Total</div>
      <div className="cart-total-amount">Rs. {orderTotal()}</div>
    </div>
  )
};

const Checkout =() =>{
  return(
    <div className='checkout-container1'>
    <section className='checkout-subscription'>
    <p className='checkout-subscription-heading'>
    Are you sure of your items in the checklist? 

    Do you want to Checkout?
    </p>
    <br/>
    <div className='input-areas'>
          <form action="" method="POST">
          <input
              className='footer-input'
              name='Ordered By'
              type='name'
              placeholder='Your Name'
            />
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
             <input
              className='footer-input'
              name='Mobile number'
              type='password'
              placeholder='Your number'
            />
             <input
              className='footer-input'
              name='adresss'
              type='text'
              placeholder='Your address'
            />

      <Link to = "/esewa"  className="btn-link1">
        <Button onclick={Esewa} buttonStyle='btn--outline1' buttonSize='btn--mobile1'>
          Place order
        </Button>
        {/* <li>
          Cash On delivery 
        </li>
        <li>
          Esewa
        </li> */}
      </Link>
     </form>
    </div>
    </section>
    </div>  
  )
};


     