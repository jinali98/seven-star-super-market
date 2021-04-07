import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/UsersContext";
import Axios from "axios";
import { Link } from "react-router-dom";

const BilledItems = () => {
  const [billedItems, setBilledItems] = useState([]);

  // get the details about the ordered item list
  useEffect(() => {
    Axios.get("http://localhost:3001/getbilledItems")
      .then((response) => {
        console.log(response.data);
        setBilledItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="main-container mt-4">
      <h1 className="user orders">Billed Items Details</h1>
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Bill Number</th>
            <th scope="col">Ordered On</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {billedItems.map((order) => {
            return (
              <tr key={order.idorder}>
                <td>{order.bill_id}</td>
                <td>{order.date}</td>
                <td>{order.pr_name}</td>
                <td>$ {order.pr_price}.00</td>
                <td>{order.pr_qty}</td>
                <td>$ {order.pr_total}.00</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BilledItems;
