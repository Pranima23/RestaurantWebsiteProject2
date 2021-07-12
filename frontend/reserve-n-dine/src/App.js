import React, { useEffect } from "react";
import axios from 'axios';
import "./App.css";
import Home from "./components/pages/HomePage/Home";
import Services from "./components/pages/Services/Services";
import Products from "./components/pages/Products/Products";
import Menu from "./components/pages/Menu/Menu";
import SignUp from "./components/pages/SignUp/SignUp";
import Register from './components/pages/SignUp/SignUp';
import Login from "./components/pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/pages/Cart/Cart";
import Footer from "./components/pages/Footer/Footer";
import ItemDetail from "./components/pages/Menu/ItemDetail";
import payment from "./components/pages/payment/payment";
// import Chatbot from "./components/Chatbot";


//context for items
import { ItemsProvider } from "./components/context/ItemsContext";
import { CartItemsProvider } from "./components/context/CartItemsContext";




function App() {
  console.log('fetching...')
 
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route path="/menu" exact>
          <CartItemsProvider>
            <ItemsProvider>
              <Menu />
            </ItemsProvider>
          </CartItemsProvider>
        </Route>
        <Route path="/menu/items/:itemId">
          {/* context for items */}
          <ItemsProvider>            
            <ItemDetail />
          </ItemsProvider>
        </Route>
        <Route path="/cart">
          <ItemsProvider>
            <CartItemsProvider>
              <Cart />
            </CartItemsProvider>
          </ItemsProvider>
        </Route>
        <Route path="/sign-up" component={SignUp} />
        <Route path="/log-in" component={Login} />
        <Route path="/payment" component={payment}/>
        <Route path='/register' component={Register} />
        {/* <Route path='/Chatbot' component={Chatbot} /> */}
      </Switch>
      <Footer />
    </Router>
     
  );
}

export default App;
