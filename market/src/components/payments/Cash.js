import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginUserContext } from "../context/LoginUserContext";
//import { LoginUserContext } from "./context/LoginUserContext";
import Axios from "axios";

export default function Cash(props) {
  let today = new Date().toDateString();
  let total = parseInt(props.match.params.id);
  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState(today);
  const [paymode, setPayMode] = useState("COD");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [billid, setbillid] = useState([]);
  let history = useHistory();

  let billNumber = billid[billid.length - 1];

  useEffect(() => {
    console.log(cartItems);
    cartItems.map((each) => {
      Axios.post("http://localhost:3001/sendOrderDetails", {
        PrName: each.item_name,
        PrPrice: each.price,
        PrQty: each.qty,
        prTotal: each.total,
        billid: billNumber.billNo,
        date: date,
        paymode: paymode,
        total: total,
        userid: userLoginId,
      })
        .then(() => {
          setMessage("Payment Successful!");
          setName("");
          setAddress("");
          setDistrict("");
          setContact("");
          deleteCart();
          history.push("/track");
        })
        .catch(() => {
          setMessage("Error! Please try again");
        });
    });
  }, [billid]);

  const nameChangeHandler = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const addressChangeHandler = (e) => {
    const adrs = e.target.value;
    setAddress(adrs);
  };
  const districtChangeHandler = (e) => {
    const district = e.target.value;
    setDistrict(district);
  };
  const numberChangeHandler = (e) => {
    const contact = e.target.value;
    setContact(contact);
  };

  const sendOrder = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/addBill", {
      name: name,
      address: address,
      district: district,
      contact: contact,
      date: date,
      paymode: paymode,
      total: total,
      userid: userLoginId,
      status: status,
    })
      .then(() => {
        setName("");
        setAddress("");
        setDistrict("");
        setContact("");

        getCart();
      })
      .catch(() => {
        setMessage("Error! Please try again");
      });
  };

  const getCart = () => {
    Axios.get(`http://localhost:3001/getCart/${userLoginId}`)
      .then((response) => {
        setCartItems(response.data);
        sendCart();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendCart = () => {
    // get billing id where date is date and user id is user id. then send cart and billing id user id to another table
    Axios.get(`http://localhost:3001/getbillno/${userLoginId}`)
      .then((response) => {
        setbillid(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCart = () => {
    Axios.delete(`http://localhost:3001/deleteCart/${userLoginId}`);
  };

  return (
    <div className="main-container mt-4">
      <div className="row mt-4">
        <div className="col-md-5 col-sm-10 offset-sm-2 offset-md-4 mt-4">
          <h1 className="users">Cash On delivery Checkout</h1>
        </div>
        <h3>{message}</h3>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 col-sm-4 offset-sm-2 offset-md-3">
          <form onSubmit={sendOrder}>
            <div section-details>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1 mt-4">Full Name</label>
                <input
                  type="text"
                  onChange={nameChangeHandler}
                  value={name}
                  required
                  className="form-control"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1 mt-4">Address</label>
                <input
                  type="text"
                  onChange={addressChangeHandler}
                  value={address}
                  required
                  className="form-control"
                  placeholder="277/D, Robert Road, Dehiwala"
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1 mt-4">District</label>
                <input
                  type="text"
                  onChange={districtChangeHandler}
                  value={district}
                  required
                  className="form-control"
                  placeholder="Colombo"
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1 mt-4">Contact number</label>
                <input
                  type="number"
                  onChange={numberChangeHandler}
                  value={contact}
                  required
                  className="form-control"
                  placeholder="0702092085"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-warning mr-2">
              Checkout
            </button>
            <Link to="/cart">
              <button className="btn btn-warning">Back to Cart</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
