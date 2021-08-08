import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./components/pages/HomePage/Home";
import Services from "./components/pages/Services/Services";
import Products from "./components/pages/Products/Products";
import book from "./components/pages/Reservations/book";
import Menu from "./components/pages/Menu/Menu";
import SignUp from "./components/pages/SignUp/SignUp";
import Register from "./components/pages/SignUp/SignUp";
import Login from "./components/pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/pages/Cart/Cart";
import Footer from "./components/pages/Footer/Footer";
import ItemDetail from "./components/pages/Menu/ItemDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import Payment from "./components/pages/payment/Payment";
import Popup from "./components/pages/payment/Popup"
import Esewa from "./components/pages/payment/Esewa";
import esewaverify from "./components/pages/payment/esewaverify";
import OrderSummary from "./components/pages/payment/OrderSummary";
// import Chatbot from "./components/Chatbot";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]")

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const [cartCount, setCartCount] = useState();

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
    updateCartCount();
  }, [cartItems]);

  const updateCartCount = () => {
    let count = 0;
    cartItems.forEach(cartItem => {
      count += cartItem.quantity
    });
    console.log(count)
    setCartCount(count);
  }

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
    updateCartCount();
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

  //const LocalStoragetoOrder = JSON.parse(localStorage.getItem("cartItems") || "{");

  //const [orderItems, setorderItems] = useState(LocalStoragetoOrder);


 // useEffect(() =>{
  //  localStorage.getItem("cartItems", JSON.stringify(orderItems))
    
 //    }, [orderItems]);
  //   console.log(orderItems)

 {/*  useEffect(() => {
     orderItems.forEach(item => {
      axios
   .post("api/orderdetails/", {
       order: 1,
       item:orderItem.item,
       quantity:orderItem.quantity  ,   
   })
  .then((res) => console.log(res));
})
},[]); 
*/}
 
 {/*function proceed (){
    console.log("proceeding to next page");
    const orderItems = localStorage.getItem("cartItems");
    console.log(orderItems)
    return orderItems;
  }*/}



  return (
    <Router>
      <Navbar cartCount={cartCount}/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route
          path="/menu"
          exact
          render={(props) => <Menu {...props} items={items} cartCount={cartCount} />}
        />
        <Route path="/menu/items/:itemId" exact>
          <ItemDetail
            items={items}
            cartItems={cartItems}
            cartCount={cartCount}
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
        <Route
          path="/OrderSummary"
          render={(props) => (
            <OrderSummary
              {...props}
             
              orderItems={cartItems}
              calculateorderItemTotal={calculateItemTotal}
              calculateOrderTotal={calculateCartTotal}
             // handleproceed={proceed}
            />
          )}
        />
         <Route path="/popup" component={Popup} />
        <Route path="/esewa" 
        render={(props) => (
          <Esewa 
          {...props}
          orderItems={cartItems}
          calculateOrderTotal={calculateCartTotal}
          />
        )}
      />
      <Route path="/esewaverify" component={esewaverify} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/log-in" component={Login} />
        <Route path="/payment" component={Payment} />
        <Route path="/register" component={Register} />
        <Route path="/reservations" component={book} />
        {/* <Route path='/Chatbot' component={Chatbot} /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
