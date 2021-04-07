import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginUserContext } from "../context/LoginUserContext";

const Dashbord = () => {
  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);

  return (
    <div className="dash-main">
      <Link to="/users">
        <button className="btn btn-warning">Users</button>
      </Link>
      <Link to="/products">
        <button className="btn btn-success">Products</button>
      </Link>
      <Link to="/order">
        <button className="btn btn-warning">Orders</button>
      </Link>
      <Link to="/billedItems">
        <button className="btn btn-success">Sales Report</button>
      </Link>
    </div>
  );
};

export default Dashbord;
