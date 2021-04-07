import React, { useState, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [file, setfFile] = useState("");
  const [namefile, setnamefile] = useState("");

  const productNameChangeHandler = (e) => {
    let name = e.target.value;
    setProductName(name);
  };
  const productPriceChangeHandler = (e) => {
    let price = parseInt(e.target.value);
    setProductPrice(price);
    console.log(productPrice);
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
  const productImageChangeHandler = (e) => {
    let image = e.target.files[0];
    setfFile(image);
    setnamefile(image.name);
  };

  const addNewProduct = (e) => {
    e.preventDefault();
    console.log(productCategory);

    let formdata = new FormData();

    formdata.append("picture", file);

    Axios.post("http://localhost:3001/picture", formdata)
      .then(() => {
        Axios.post("http://localhost:3001/addProducts", {
          prName: productName,
          prPrice: productPrice,
          prCategory: productCategory,
          prQty: productQty,
          prDesc: productDesc,
          prImage: namefile,
        })
          .then(() => {
            console.log("success");
            setProductName("");
            setProductPrice(0);
            setProductCategory("");
            setProductQty("");
            setProductDesc("");
            setnamefile("");
          })
          .catch(() => {
            console.log("Error! Please try again");
          });
      })
      .catch(() => {
        console.log("Error! Please try again");
      });

    // Axios.post("http://localhost:3001/addProducts", {
    //   prName: productName,
    //   prPrice: productPrice,
    //   prCategory: productCategory,
    //   prQty: productQty,
    //   prDesc: productDesc,
    //   prImage: namefile,
    // })
    //   .then(() => {
    //     console.log("success");
    //     setProductName("");
    //     setProductPrice(0);
    //     setProductCategory("");
    //     setProductQty("");
    //     setProductDesc("");
    //     setnamefile("");
    //   })
    //   .catch(() => {
    //     console.log("Error! Please try again");
    //   });
  };

  return (
    <div className="main-container mt-4">
      <div className="row mt-4">
        <div className="col-md-5 col-sm-10 offset-sm-2 offset-md-4 mt-4">
          <h3 className="users">Add Products</h3>
          <p>
            Go to <Link to="/dashbord">Dashbord</Link>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-4 offset-sm-2 offset-md-3">
          <form onSubmit={addNewProduct}>
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
            <div className="form-group mt-4">
              <label for="exampleFormControlFile1">Example file input</label>
              <input
                type="file"
                onChange={productImageChangeHandler}
                className="form-control-file"
                id="exampleFormControlFile1"
                name="picture"
                accept=""
              />
            </div>
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
            <Link to="/">
              <button className="btn btn-warning">Home</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
