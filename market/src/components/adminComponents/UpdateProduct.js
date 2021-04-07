import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const UpdateProduct = (props) => {
  let id = parseInt(props.match.params.id);

  const [productId, setProductId] = useState(id);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [success, setSuccess] = useState(false);
  //const [productImage, setProductImage] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const productNameChangeHandler = (e) => {
    let name = e.target.value;
    setProductName(name);
  };
  const productPriceChangeHandler = (e) => {
    let price = parseInt(e.target.value);
    setProductPrice(price);
  };
  const productCategoryChangeHandler = (e) => {
    let category = e.target.value;
    setProductCategory(category);
  };
  const productQtyChangeHandler = (e) => {
    let qty = e.target.value;
    setProductQty(qty);
  };
  const productDescChangeHandler = (e) => {
    let desc = e.target.value;
    setProductDesc(desc);
  };
  // const productImageChangeHandler = (e) => {
  //   let image = e.target.files[0];
  //   setProductImage(image);
  // };

  const updateProduct = (e) => {
    e.preventDefault();
    // const fd = new FormData();
    // fd.append("image", productImage, productImage.name);
    const data = {
      prid: productId,
      prName: productName,
      prPrice: productPrice,
      prCategory: productCategory,
      prQty: productQty,
      prDesc: productDesc,
      // prImage: fd,
    };
    Axios.put("http://localhost:3001/updateProducts", data)
      .then((data) => {
        console.log("success");
        setProductName("");
        setProductPrice(0);
        setProductCategory("");
        setProductQty("");
        setProductDesc("");
        //setProductImage("");
        setSuccess(true);
      })
      .catch((err) => {
        console.log("Error! Please try again");
      });
  };

  return (
    <div className="main-container mt-4">
      <div className="row mt-4">
        <div className="col-md-5 col-sm-10 offset-sm-2 offset-md-4 mt-4">
          <h3 className="users">Update Product</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-4 offset-sm-2 offset-md-3">
          <p>{success ? "Successfully Updated!" : null}</p>
          <h4>Product ID : {productId}</h4>
          <form onSubmit={updateProduct}>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1 mt-4">Product Name</label>
              <input
                type="text"
                onChange={productNameChangeHandler}
                value={productName}
                required
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Red Onion"
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1 mt-4">Product Quantity</label>
              <input
                type="text"
                onChange={productQtyChangeHandler}
                value={productQty}
                required
                className="form-control"
                id="exampleInputEmail1"
                placeholder="1kg"
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1 mt-4">Price</label>
              <input
                type="number"
                onChange={productPriceChangeHandler}
                value={productPrice}
                required
                className="form-control"
                id="exampleInputEmail1"
                placeholder="150"
              />
            </div>
            {/* <div className="form-group mt-4">
              <label for="exampleFormControlFile1">Example file input</label>
              <input
                type="file"
                onChange={productImageChangeHandler}
                className="form-control-file"
                id="exampleFormControlFile1"
                name="uploaded_image"
                accept=""
              />
            </div> */}
            <div className="form-group mt-4">
              <label htmlFor="exampleInputPassword1 mt-4">
                Select category
              </label>
              <select
                className="ml-4"
                onChange={productCategoryChangeHandler}
                required
              >
                <option value=""></option>
                <option value="vege_1">Vegetables</option>
                <option value="fruits_2">Fruits</option>
                <option value="bakery_3">Bakery</option>
                <option value="meat_4">meat</option>
                <option value="diary_5">Diary</option>
                <option value="nuts_6">Nuts</option>
                <option value="sweets_7">Sweets</option>
                <option value="canfood_8">Can-food</option>
                <option value="freshSalads_9">fresh-Salads</option>
              </select>
            </div>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1 mt-4">Description</label>
              <textarea
                type="text"
                onChange={productDescChangeHandler}
                value={productDesc}
                required
                className="form-control"
                id="exampleInputEmail1"
                placeholder="This fresh green apples.."
              />
            </div>
            <button type="submit" className="btn btn-warning mr-2">
              Add
            </button>
            <Link to="/dashbord">
              <button className="btn btn-warning">Dashbord</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
