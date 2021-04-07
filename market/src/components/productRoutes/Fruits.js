import React, { useContext, useEffect, useState } from "react";
// import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Axios from "axios";

const Fruits = () => {
  // const [viewItem, setViewItem] = useContext(ProductContext);
  const [sorted, setSorted] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/getProducts")
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortBy = () => {
    setAllProducts(
      allProducts.sort((a, b) => {
        return a.price - b.price;
      })
    );

    setSorted("Yes");

    // console.log(allProducts);
    // console.log(sorted);
  };

  return (
    <div className="main-container">
      <h1 className="productItemsPage">Fresh Fruits</h1>
      <div className="itemOrder mt-4">
        <div className="searching">
          <input
            className="form-control mr-sm-2 searchBar"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => {
              setSearchItem(event.target.value);
            }}
          />
        </div>
        <div className="sort">
          <button className="btn btn-warning btn-sm" onClick={() => sortBy()}>
            Price lower to highest
          </button>
        </div>
      </div>
      <div className="item-category mt-4">
        {allProducts
          .filter((val) => {
            if (searchItem === "") {
              return val;
            } else if (
              val.product_name.toLowerCase().includes(searchItem.toLowerCase())
            ) {
              return val;
            }
          })
          .map((product) => {
            if (product.idcategory === "fruits_2") {
              return (
                <div className="item-card mt-4" key={product.idproducts}>
                  <img
                    className="item-image"
                    src={"./uploads/" + product.prImage}
                    alt={product.product_name}
                  />
                  <p className="item-name">{product.product_name}</p>
                  <p className="item-quantity">{product.product_qty}</p>
                  <p className="item-price">${product.price}</p>
                  <Link to={"/item/" + product.idproducts}>
                    <button className="btn btn-warning btn-sm">
                      Add to cart
                    </button>
                  </Link>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
};
export default Fruits;
