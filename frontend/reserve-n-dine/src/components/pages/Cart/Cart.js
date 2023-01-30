import React, { useState, useContext } from "react";

import HeroSection from "../../HeroSection";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from "./Data";
import Pricing from "../../Pricing";
import "./Cart.css";
import { CartItemsContext } from "../../context/CartItemsContext";

import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GrFormAdd, GrFormSubtract, GrPrevious, GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import Popup from "../payment/Popup";

// const initialState = [
//   {
//     item: {
//       id: 1,
//       name: "Veg Momo",
//       cost: 100,
//       ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//       img: vegmomo,
//       category_id: 3,
//     },
//     quantity: 2,
//   },
//   {
//     item: {
//       id: 6,
//       name: "Chocolate",
//       cost: 80,
//       ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//       img: chocolateicecream,
//       category_id: 7,
//     },
//     quantity: 2,
//   },
// ]

// const reducer = (state, action) => {
//   switch(action.type) {
//     case 'increment':

//   }
// }

const Cart = (props) => {
  const {
    cartItems,
    handleDecrement,
    handleIncrement,
    handleDelete,
    calculateItemTotal,
    calculateCartTotal,
  } = props;

  

  return (
    <>
      <CartContent>
        <CartHeader />
        {Object.keys(cartItems).length === 0 && <NoCart />}
        {Object.keys(cartItems).length !== 0 && (
          <>
            <CartItemsTable>
              {cartItems.map((cartItem, index) => (
                <CartItem
                  key={index}
                  cartItem={cartItem}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onDelete={handleDelete}
                  itemTotal={calculateItemTotal}
                />
              ))}
            </CartItemsTable>
            <CartTotal cartTotal={calculateCartTotal} />
            <CartButtons />
          </>
        )}
      </CartContent>
    </>
  );
};

export default Cart;

const CartContent = (props) => {
  return <div className="cart-content">{props.children}</div>;
};

const CartHeader = () => {
  return <div className="cart-header">Your Cart</div>;
};

const NoCart = () => {
  return <div className="no-cart">Nothing to display in your cart.</div>;
};

const CartItemsTable = (props) => {
  return (
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
  );
};

const CartItem = (props) => {
  const { cartItem, onIncrement, onDecrement, onDelete, itemTotal } = props;
  const { name, cost, id, image, quantity } = cartItem;
  const renderPrice = () => {
    if (cartItem) {
      if (cartItem.offer) {
        return (
          <>
            <strike>Rs {cartItem.cost}</strike>
            <br></br>Rs {cartItem.cost_after_discount}
          </>
        );
      } else {
        return <>Rs {cartItem.cost}</>;
      }
    }
  };
  return (
    <tr className="div-row">
      <td className="div-col cart-item-img-container">
        <img className="cart-item-img" src={image} alt={name} />
      </td>
      <td className="div-col cart-item-name">{name}</td>
      <td className="div-col cart-item-price">{renderPrice()}</td>
      <td className="div-col cart-item-qty">
        <button className="dcr-btn" onClick={() => onDecrement(cartItem)}>
          <GrFormSubtract style={{ fontSize: "0.8em" }} />
        </button>

        {quantity}
        <button className="incr-btn" onClick={() => onIncrement(cartItem)}>
          <GrFormAdd style={{ fontSize: "0.8em" }} />
        </button>
      </td>
      <td className="div-col cart-item-total">Rs {itemTotal(cartItem)}</td>
      <td className="div-col cart-item-del">
        <button
          className="cart-item-del-btn"
          onClick={() => onDelete(cartItem)}
        >
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
};

const CartTotal = ({ cartTotal }) => {
  return (
    <div className="cart-total">
      <div className="cart-total-header">Total</div>
      <div className="cart-total-amount">Rs {cartTotal()}</div>
    </div>
  );
};

const CartButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="cart-btns">
      <Link to="/menu">
        <button className="add-btn">
          <FaChevronLeft style={{ marginRight: "1em", fontSize: "0.8em" }} />
          Add more items
        </button>
      </Link>
      <div>
        <button className="proceed-btn" onClick={togglePopup}>
          Proceed
          <FaChevronRight style={{ marginLeft: "1em", fontSize: "0.8em" }} />
        </button>
        {isOpen && (
          <Popup
            content={
              <>
                <b>Payment Options</b>
                <div className="payment-option">
                  <Link to="/payment">
                    <button className="pay-with-esewa">eSewa</button>
                  </Link>
                  <button className="pay-with-cash">Cash</button>
                </div>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </div>
  );
};
