import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Menu.css";
import { Link } from "react-router-dom";
import { FaSearch, FaAngleUp, FaAngleDown, FaCartPlus } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { IconContext } from "react-icons";
import HeroSection from "../../HeroSection";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from "./Data";
import Pricing from "../../Pricing";
import { ItemsContext } from "../../context/ItemsContext";
import { CartItemsContext } from "../../context/CartItemsContext";

const Menu = (props) => {
  const { items } = props;
  /*===========
  States
  ===========*/
  // [
  //   {
  //     id: 1,
  //     name: "Drinks",
  //     parent_category: null,
  //   },
  //   {
  //     id: 2,
  //     name: "Snacks",
  //     parent_category: null,
  //   },
  //   {
  //     id: 3,
  //     name: "Momo",
  //     parent_category: 2,
  //   },
  //   {
  //     id: 4,
  //     name: "Chowmein",
  //     parent_category: 2,
  //   },
  //   {
  //     id: 5,
  //     name: "Lassi",
  //     parent_category: 1,
  //   },
  //   {
  //     id: 6,
  //     name: "Tea",
  //     parent_category: 1,
  //   },
  //   {
  //     id: 7,
  //     name: "Ice Cream",
  //     parent_category: null,
  //   },
  // ]

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  //other states
  const [selectedCategory, setSelectedCategory] = useState({});

  const [selectedParentCategory, setSelectedParentCategory] = useState({});

  const [selectedItems, setSelectedItems] = useState([...items]);
  console.log(items);

  /*===========
  Variables
  ===========*/

  /*===========
  Functions
  ===========*/

  const onSelectingAll = () => {
    setSelectedCategory({});
    setSelectedParentCategory({});
    setSelectedItems(items);
  };

  const onSelectingCategory = (category) => {
    setSelectedCategory(category);
    if (category.parent_category !== null) {
      setSelectedParentCategory(
        categories.find((element) => category.parent_category === element.id)
      );
    } else {
      setSelectedParentCategory({});
    }

    setSelectedItems(
      items.filter((item) => item.category.includes(category.id))
    );
  };

  console.log(selectedCategory);
  console.log(selectedParentCategory);
  console.log(selectedItems);

  const renderSelectedCategoryTitle = () => {
    if (Object.keys(selectedCategory).length === 0) {
      return;
    } else if (Object.keys(selectedParentCategory).length === 0) {
      return (
        <div className="selected-category-container">
          <div className="selected-category">{selectedCategory.name}</div>
        </div>
      );
    } else {
      return (
        <div className="selected-category-container">
          <div className="selected-category">{selectedParentCategory.name}</div>
          <IconContext.Provider
            value={{
              style: { fontSize: "1.6em", margin: "0 12px", fill: "green" },
            }}
          >
            <GrFormNext style={{ fill: "green" }} />
          </IconContext.Provider>

          <div className="selected-subcategory">{selectedCategory.name}</div>
        </div>
      );
    }
  };

  const renderMenuItems = () => {
    if (Object.keys(selectedItems).length === 0) {
    } else {
      return (
        <Items>
          {selectedItems.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Items>
      );
    }
    return;
  };

  return (
    <>
      <MenuContent>
        <CartIcon />

        <SearchBar />

        <SideNav>
          <CategoriesList handleSelectingAll={onSelectingAll}>
            {categories
              .filter((category) => !category.parent_category)
              .map((category, index) => (
                <Category
                  key={index}
                  category={category}
                  categories={categories}
                  handleSelectingCategory={onSelectingCategory}
                />
              ))}
          </CategoriesList>
        </SideNav>
        <MainContent>
          {renderSelectedCategoryTitle()}
          {renderMenuItems()}
        </MainContent>
      </MenuContent>
    </>
  );
};

export default Menu;

const MenuContent = (props) => {
  return <div className="menu-content">{props.children}</div>;
};

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <form className="search-bar">
        <input
          id="search-item"
          className="search-item"
          type="text"
          placeholder="Search food item"
          aria-label="Search food item"
        />
        <button className="search-icon">
          <FaSearch style={{ fontSize: "1rem" }} />
        </button>
      </form>
    </div>
  );
};

const SideNav = (props) => {
  return (
    <div className="menu-sidenav">
      <div className="categories-header">Categories</div>

      {props.children}
    </div>
  );
};

const CategoriesList = (props) => {
  return (
    <div className="categories-list">
      <button className="category-btn" onClick={props.handleSelectingAll}>
        All
      </button>
      {props.children}
    </div>
  );
};

const Category = (props) => {
  const renderCategory = () => {
    //Extracting subcategories of individual parent category
    const subcategories = [];
    props.categories.forEach((element) => {
      if (element.parent_category === props.category.id) {
        subcategories.push(element);
      }
    });
    //console.log(props.categories);
    if (subcategories.length === 0) {
      return (
        <button
          className="category-btn"
          onClick={() => props.handleSelectingCategory(props.category)}
        >
          <div className="category-title">{props.category.name}</div>
        </button>
      );
    } else {
      return (
        <SubCategoriesDropdown
          title={props.category.name}
          list={subcategories}
          handleSelectingSubCategory={props.handleSelectingCategory}
        ></SubCategoriesDropdown>
      );
    }
  };
  return (
    <div className="category">
      {renderCategory()}
      {props.children}
    </div>
  );
};

const SubCategoriesDropdown = (props) => {
  const [open, setOpen] = useState(false);

  const toggleList = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="dd-wrapper">
      <button type="button" className="dd-header" onClick={toggleList}>
        {props.title}
        {/* <div className="header-title">{headerTitle}</div> */}

        {open ? (
          <FaAngleUp style={{ fontSize: "1em" }} />
        ) : (
          <FaAngleDown style={{ fontSize: "1em" }} />
        )}
      </button>
      {open && (
        <div className="list">
          {props.list.map((item) => (
            <button
              type="button"
              className="dd-list-item"
              key={item.id}
              onClick={() => props.handleSelectingSubCategory(item)}
            >
              <div className="sub-category-title">{item.name}</div>
            </button>
          ))}
        </div>
      )}
      {props.children}
    </div>
  );
};

const MainContent = (props) => {
  return <div className="main-content">{props.children}</div>;
};

const Items = (props) => {
  return <div className="menu-items-list">{props.children}</div>;
};

const Item = ({ item }) => {
  const renderPrice = () => {
    if (item) {
      if (item.offer) {
        return (
          <>
            <strike>Rs {item.cost}</strike>
            <br></br>Rs {item.cost_after_discount}
          </>
        );
      } else {
        return <>Rs {item.cost}</>;
      }
    }
  };
  return (
    <div className="menu-item-card">
      <Link
        to={`/menu/items/${item.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="menu-img-container">
          <img src={item.image} alt={item.name} className="menu-item-img" />
        </div>

        <div className="menu-card-content">
          <div className="menu-item-name">{item.name}</div>
          <div className="menu-item-cost">{renderPrice()}</div>
          <button className="menu-add-to-cart-btn">Add to Cart</button>
        </div>
      </Link>
    </div>
  );
};

const CartIcon = () => {
  return (
    <>
      <Link to="/cart">
        <button className="cart-icon-link">
          <FaCartPlus style={{ fontSize: "1.4rem" }} />
          <span className="cart-items-no">5</span>
        </button>
      </Link>
    </>
  );
};
