import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { LoginUserContext } from "./context/LoginUserContext";

export default function Track() {
  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);
  const [bill, setBill] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getbillno/${userLoginId}`)
      .then((response) => {
        setBill(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userLoginId]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getorders/${userLoginId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userLoginId]);

  return (
    <div className="main-container mt-4">
      <div className="row mt-4">
        <div className="col-md-5 col-sm-10 offset-sm-2 offset-md-4 mt-4">
          <h1 className="users">Order Summaries</h1>
        </div>
      </div>
      <div className="row mt -4">
        <div className="col-md-6 col-sm-4 offset-sm-2 offset-md-3 mt -4">
          {bill.map((each) => {
            return (
              <div className="mt-4 mb-4 order-display" key={each.billNo}>
                <div className="mt-4 order-status">
                  <p>Bill No : {each.billNo}</p>
                  <p>Ordered On : {each.date} </p>
                  <p>Payment Type : {each.paymode} </p>
                  <p>Bill Value : $ {each.total}</p>
                  <p>Receipenet Name : {each.name} </p>
                  <p>Delivery Location : {each.adrs} </p>
                  <p>Contact Number : {each.contactNumber} </p>
                  <p>Order Status : {each.status}</p>
                </div>
                <table className="table mt-4">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      if (order.bill_id === each.billNo) {
                        return (
                          <tr key={order.idorder}>
                            <td>{order.pr_name}</td>
                            <td>{order.pr_qty}</td>
                            <td>$ {order.pr_price}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
