import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginUserContext } from "./context/LoginUserContext";

import Axios from "axios";

export default function CheoutButtons(props) {
  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);
  let total = props.total;
  let history = useHistory();

  return (
    <div>
      <Link to={"/cash/" + total}>
        <button className="btn btn-success mr-2">Cash On Delivery</button>
      </Link>

      <Link to={"/visa/" + total}>
        <button className="btn btn-success">Online Payment</button>
      </Link>
    </div>
  );
}
