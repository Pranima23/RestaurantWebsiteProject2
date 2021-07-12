import React, { useState, useEffect } from "react";
import axios from 'axios';

import vegmomo from "./images/veg-momo.jpg";
import bananalassi from "./images/banana-lassi.jpg";
import buffchowmein from "./images/buff-chowmein.jpg";
import butterscotch from "./images/butter-scotch.jpeg";
import chickencmomo from "./images/chicken-c-momo.jpg";
import vegchowmein from "./images/veg-chowmein.jpg";
import chocolateicecream from "./images/chocolate-icecream.jpg";
import friedbuffmomo from "./images/fried-buff-momo.png";
import lemontea from "./images/lemon-tea.jpg";
import milktea from "./images/milk-tea.jpg";
import strawberry from "./images/strawberry.jpg";
import vanilla from "./images/vanilla.jpg";

import lassi from "./images/lassi.JPG";
import chickensizzler from "./images/chicken-sizzler.jpg";

export const ItemsContext = React.createContext();
// [
//   {
//     item_id: 1,
//     item_name: "Veg Momo",
//     item_cost: 100,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: vegmomo,
//     category_id: 3,
//     item_description: "veg momo",
//   },
//   {
//     item_id: 2,
//     item_name: "Fried Buff Momo",
//     item_cost: 120,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: friedbuffmomo,
//     category_id: 3,
//     item_description:"fried buff momo",
//   },

//   {
//     item_id: 3,
//     item_name: "Chicken C Momo",
//     item_cost: 130,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: chickencmomo,
//     category_id: 3,
//     item_description:"chicken c momo ",
//   },
//   {
//     item_id: 4,
//     item_name: "Lemon Tea",
//     item_cost: 20,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: lemontea,
//     category_id: 6,
//     item_description:"aagati chiya",
//   },
//   {
//     item_id: 5,
//     item_name: "Milk Tea",
//     item_cost: 25,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: milktea,
//     category_id: 6,
//     item_description:"sudha gai ko dudh ko chiya",
//   },
//   {
//     item_id: 6,
//     item_name: "Chocolate",
//     item_cost: 80,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: chocolateicecream,
//     category_id: 7,
//     item_description:"dairy milk",
//   },
//   {
//     item_id: 7,
//     item_name: "Butter Scotch",
//     item_cost: 100,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: butterscotch,
//     category_id: 7,
//     item_description:"best flavour icecream",
//   },
//   {
//     item_id: 8,
//     item_name: "Banana Lassi",
//     item_cost: 100,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: bananalassi,
//     category_id: 5,
//     item_description:"made from juju dhau and banana",
//   },
//   {
//     item_id: 9,
//     item_name: "Veg Chowmein",
//     item_cost: 50,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: vegchowmein,
//     category_id: 4,
//     item_description:"Get the local taste from our veg chowmein" ,
//   },
//   {
//     item_id: 9,
//     item_name: "Buff Chowmein",
//     item_cost: 80,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: buffchowmein,
//     category_id: 4,
//     item_description:"Get the local taste from our buff chowmein ",
//   },
//   {
//     item_id: 10,
//     item_name: "Vanilla",
//     item_cost: 100,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: vanilla,
//     category_id: 7,
//     item_description: "Made with the best vanilla extraction",
//   },
//   {
//     item_id: 11,
//     item_name: "Strawberry",
//     item_cost: 100,
//     item_ingredients: "Flour, Potato, Carrot, Cabbage, Garlic",
//     item_img: strawberry,
//     category_id: 7,
//     item_description: "Made from organic strawberry",
//   },
// ]

export const ItemsProvider = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("api/items/")
        .then((res) => setItems(res.data))
          .catch((err) => console.log(err));
        }, []);

 

  return (
    <ItemsContext.Provider value={items}>
      {props.children}
    </ItemsContext.Provider>
  );
};

