import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { CartIcon } from "./Menu";

//context for items
import { ItemsContext } from "../../context/ItemsContext";
import { CartItemsContext } from "../../context/CartItemsContext";
import axios from "axios";

const ItemDetail = (props) => {
  const { cartItems, cartCount, handleAddToCart } = props;
  console.log(cartItems);

  const { itemId } = useParams();
  console.log(itemId);

  const [activeItem, setActiveItem] = useState({});
  let initialQuantity = 0;
  let thisCartItem;
  if (activeItem) {
    thisCartItem = cartItems.find((cartItem) => cartItem.id === activeItem.id);
    console.log(thisCartItem);
  }
  if (thisCartItem) {
    initialQuantity = thisCartItem.quantity;
    console.log("initial quantity", initialQuantity);
  }
  
  const [quantity, setQuantity] = useState(initialQuantity);
  console.log(quantity);

  useEffect(() => {
    console.log("fetching item detail");
    axios
      .get(`/api/items/${itemId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setActiveItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [itemId]);

  // const activeItem = items.find((item) => item.id === parseInt(itemId));
  // console.log(activeItem);

  const renderPrice = () => {
    if (activeItem) {
      if (activeItem.offer) {
        return (
          <>
            <strike>Rs {activeItem.cost}</strike> Rs{" "}
            {activeItem.cost_after_discount}
          </>
        );
      } else {
        return <>Rs {activeItem.cost}</>;
      }
    }
  };
  return (
    <div>
      <div className="back-to-result">
        <Link to="/menu" style={{ textDecoration: "none", color: "inherit" }}>
          <ArrowBackIcon />
        </Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img
            src={activeItem && activeItem.image}
            alt={(activeItem && activeItem.name) || "image"}
          ></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <div className="item-name">
                <h1>{activeItem && activeItem.name}</h1>
              </div>
            </li>
            <li>
              <div className="item-description">
                <h1>Description:</h1>
                <p>{activeItem && activeItem.description}</p>
              </div>
            </li>
            <li>
              <div className="ingredients">
                <h1>Ingredients:</h1>
                <p>{activeItem && activeItem.ingredients}</p>
              </div>
            </li>

            <li>
              <div className="price">
                <h1>Price:</h1>
                <p>
                  <b>{renderPrice()}</b>
                </p>
              </div>
            </li>
            <li>
              <div className="quantity">
                <div className="qty">
                  <input
                    required
                    type="number"
                    name="Quantity"
                    placeholder="Quantity"
                    min="0"
                    value={quantity && Math.max(0, quantity)}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() =>
                    handleAddToCart(activeItem, parseInt(quantity))
                  }
                >
                  Add to Cart
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <CartIcon cartCount={cartCount} />
    </div>
  );
};

export default ItemDetail;
