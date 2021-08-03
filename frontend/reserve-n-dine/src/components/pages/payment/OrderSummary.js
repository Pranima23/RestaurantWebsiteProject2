import React , { Component, useState }from 'react';
import Cart from "../Cart/Cart";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import "./OrderSummary.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GrFormAdd, GrFormSubtract, GrPrevious, GrNext } from "react-icons/gr";

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
  return <Link to ="/cart"><div className="update">Update your cart</div></Link>
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
     <div class="checkout">
     <h3>Checkout Form</h3>
     <form action="" method="POST">
       Ordered by:
       <input type="text"></input>
       <p>Address<input type="text"></input></p>
       <p>Mobile No.<input type="text"/></p>
       <p>Email<input type="text"/></p>
       <Link to = "/esewa"><p><button class="btn-info">Place order</button></p></Link>
     </form>
     </div>
  )
};


     