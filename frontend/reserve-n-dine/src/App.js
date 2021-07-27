import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./components/pages/HomePage/Home";
import Services from "./components/pages/Services/Services";
import Products from "./components/pages/Products/Products";
import Menu from "./components/pages/Menu/Menu";
import SignUp from "./components/pages/SignUp/SignUp";
import Register from "./components/pages/SignUp/SignUp";
import Login from "./components/pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/pages/Cart/Cart";
import Footer from "./components/pages/Footer/Footer";
import ItemDetail from "./components/pages/Menu/ItemDetail";
import payment from "./components/pages/payment/payment";
// import Chatbot from "./components/Chatbot";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]")

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  useEffect(() => {
    axios
      .get("api/items/")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("fetching...");
  console.log(items);

  useEffect(() =>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

  }, [cartItems]);

  //event handlers
  const handleAddToCart = (item, quantity) => {
    if (item && quantity>0){
    const updatedCart = cartItems;
    const updatedItemIndex = updatedCart.findIndex(
      (cartItem) => item.id === cartItem.id
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...item, quantity: quantity });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex],
      };
      updatedItem.quantity = quantity;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

    window.alert("Item added to Cart.")
  } else window.alert("Invalid.")
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
    console.log(cartItem);
    const quantity = cartItem.quantity;
    const rate = parseFloat(cartItem.cost_after_discount);
    return quantity * rate;
  };

  const calculateCartTotal = () => {
    let priceTotal = 0;
    cartItems.forEach((cartItem) => {
      priceTotal += calculateItemTotal(cartItem);
    });
    return priceTotal;
  };

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route
          path="/menu"
          exact
          render={(props) => <Menu {...props} items={items} />}
        />
        <Route path="/menu/items/:itemId" exact>
          <ItemDetail
            items={items}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
          />
        </Route>
        <Route
          path="/cart"
          render={(props) => (
            <Cart
              {...props}
              items={items}
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleDelete={handleDelete}
              calculateItemTotal={calculateItemTotal}
              calculateCartTotal={calculateCartTotal}
            />
          )}
        />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/log-in" component={Login} />
        <Route path="/payment" component={payment} />
        <Route path="/register" component={Register} />
        {/* <Route path='/Chatbot' component={Chatbot} /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
