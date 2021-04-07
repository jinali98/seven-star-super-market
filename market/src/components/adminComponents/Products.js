import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  // get the product details
  useEffect(() => {
    Axios.get("http://localhost:3001/getProducts")
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // delete the selected product item
  const deleteProducts = (idproducts) => {
    Axios.delete(`http://localhost:3001/deleteProducts/${idproducts}`);
  };

  return (
    <div className="main-container mt-4">
      <h1 className="users">Product Information</h1>
      <Link to="/newProduct">
        <button className="mt-4 btn btn-warning">Add New Product</button>
      </Link>
      <Link to="/dashbord">
        <button className="mt-4 ml-4 btn btn-warning">Dashbord</button>
      </Link>
      <div className="searching mt-2">
        <input
          className="form-control mr-sm-2 searchBar"
          type="search"
          placeholder="Search By Product Name"
          aria-label="Search"
          onChange={(event) => {
            setSearchItem(event.target.value);
          }}
        />
      </div>
      <table class="table mt-4">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Product Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allProducts
            .filter((val) => {
              if (searchItem === "") {
                return val;
              } else if (
                val.product_name
                  .toLowerCase()
                  .includes(searchItem.toLowerCase())
              ) {
                return val;
              }
            })
            .map((product) => {
              return (
                <tr key={product.idproducts}>
                  <td>{product.idproducts}</td>
                  <td>{product.product_name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.idcategory}</td>
                  <td>{product.product_qty}</td>
                  <td>{product.product_desc}</td>
                  <td>
                    <Link to={"/updateProduct/" + product.idproducts}>
                      <button className="btn btn-success mr-2">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => deleteProducts(product.idproducts)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
