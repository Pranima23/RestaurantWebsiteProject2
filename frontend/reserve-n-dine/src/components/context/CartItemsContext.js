import React, { useState, useContext } from "react";
import { ItemsContext } from "./ItemsContext";

import vegmomo from "./images/veg-momo.jpg";
import chocolateicecream from "./images/chocolate-icecream.jpg";

export const CartItemsContext = React.createContext();

export const CartItemsProvider = (props) => {
  const [cartItems, setCartItems] = useState([
    {
      item_id: 1,
      item_name: "Veg Momo",
      item_cost: 100,
      item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
      item_img: vegmomo,
      category_id: 3,
      quantity: 2,
    },
    {
      item_id: 6,
      item_name: "Chocolate",
      item_cost: 80,
      item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
      item_img: chocolateicecream,
      category_id: 7,
      quantity: 2,
    },
  ]);

  //callback functions
  const handleAddToCart = (item, quantity) => {
    const updatedCart = cartItems;
    const updatedItemIndex = updatedCart.findIndex(
      cartItem => item.item_id === cartItem.item_id
    );
  
    if (updatedItemIndex < 0) {
      updatedCart.push({ ...item, quantity: quantity });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity = quantity;
      updatedCart[updatedItemIndex] = updatedItem;
    }   

    setCartItems(updatedCart);
  };

  const handleDecrement = (cartItem) => {
    const index = cartItems.indexOf(cartItem);

    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
    } else {
      cartItems.splice(index, 1);
    }

    setCartItems([...cartItems]);
  };

  const handleIncrement = (cartItem) => {
    const index = cartItems.indexOf(cartItem);

    cartItems[index].quantity++;

    setCartItems([...cartItems]);
  };

  const handleDelete = (cartItem) => {
    const index = cartItems.indexOf(cartItem);

    cartItems.splice(index, 1);

    setCartItems([...cartItems]);
  };

  const calculateItemTotal = (cartItem) => {
    const quantity = cartItem.quantity;
    const rate = cartItem.item_cost;
    return quantity * parseFloat(rate);
  };

  const calculateCartTotal = () => {
    let priceTotal = 0;
    cartItems.forEach((cartItem) => {
      priceTotal += calculateItemTotal(cartItem);
    });
    return priceTotal;
  };

  return (
    <CartItemsContext.Provider
      value={{
        cartItems: cartItems,
        handleAddToCart: handleAddToCart,
        handleDecrement: handleDecrement,
        handleIncrement: handleIncrement,
        handleDelete: handleDelete,
        calculateItemTotal: calculateItemTotal,
        calculateCartTotal: calculateCartTotal,
      }}
    >
      {props.children}
    </CartItemsContext.Provider>
  );
};
