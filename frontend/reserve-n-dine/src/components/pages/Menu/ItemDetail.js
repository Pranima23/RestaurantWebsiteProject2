import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//context for items
import { ItemsContext } from "../../context/ItemsContext";
import { CartItemsContext } from "../../context/CartItemsContext";

const ItemDetail = (props) => {
  const { items, cartItems, handleAddToCart } = props;
  console.log(items, cartItems);

  const { itemId } = useParams();
  console.log(itemId);
  const thisItem = items.find((item) => item.id === parseInt(itemId));
  console.log(thisItem);

  var initialQuantity = 0;
  var thisCartItem;
  if (thisItem) {
    thisCartItem = cartItems.find((cartItem) => cartItem.id === thisItem.id);
    console.log(thisCartItem);
  }
  if (thisCartItem) {
    initialQuantity = thisCartItem.quantity;
  }

  const [quantity, setQuantity] = useState(initialQuantity);
  console.log(quantity);

  const renderPrice = () => {
    if (thisItem) {
      if (thisItem.offer) {
        return (
          <>
            <strike>Rs {thisItem.cost}</strike> Rs {thisItem.cost_after_discount}
          </>
        );
      } else {
        return <>Rs {thisItem.cost}</>;
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
            src={thisItem && thisItem.image}
            alt={(thisItem && thisItem.name) || "image"}
          ></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <div className="item-name">
                <h1>{thisItem && thisItem.name}</h1>
              </div>
            </li>
            <li>
              <div className="item-description">
                <h1>Description:</h1>
                <p>{thisItem && thisItem.description}</p>
              </div>
            </li>
            <li>
              <div className="ingredients">
                <h1>Ingredients:</h1>
                <p>{thisItem && thisItem.ingredients}</p>
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
                  onClick={() => handleAddToCart(thisItem, parseInt(quantity))}
                >
                  Add to Cart
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
