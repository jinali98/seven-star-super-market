import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/UsersContext";
import Axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allbilling, setAllbilling] = useState([]);

  // get billing details
  useEffect(() => {
    Axios.get("http://localhost:3001/getbilling")
      .then((response) => {
        console.log(response.data);
        setAllbilling(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="main-container mt-4">
      <h1 className="Order Status user orders">Order Details</h1>
      <table class="table mt-4">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Bill Number</th>
            <th scope="col">User ID</th>
            <th scope="col">User Name</th>
            <th scope="col">Address</th>
            <th scope="col">District</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Total</th>
            <th scope="col">Paymode</th>
            <th scope="col">Status</th>
            <th scope="col">Status update</th>
          </tr>
        </thead>
        <tbody>
          {allbilling.map((order) => {
            return (
              <tr key={order.billNo}>
                <td>{order.date}</td>
                <td>{order.billNo}</td>
                <td>{order.iduser}</td>
                <td>{order.name}</td>
                <td>{order.adrs}</td>
                <td>{order.district}</td>
                <td>{order.contactNumber}</td>
                <td>{order.total}</td>
                <td>{order.paymode}</td>
                <td className="status">{order.status}</td>
                <td>
                  <Link to={"/updatestatus/" + order.billNo}>
                    <button className="btn btn-success mr-2">Update</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
