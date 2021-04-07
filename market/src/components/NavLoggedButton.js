import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginUserContext } from "./context/LoginUserContext";
import Axios from "axios";

export default function NavLoggedButton() {
  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);
  let history = useHistory();

  const UserLogout = () => {
    setUserLoginId(0);
    localStorage.clear();
    history.push({
      pathname: "/",
      state: 0,
    });
  };

  return (
    <div>
      <button className="btn btn-outline-warning mr-2" onClick={UserLogout}>
        LogOut
      </button>
      <Link to="/track">
        <button className="btn btn-outline-warning">Track order</button>
      </Link>
    </div>
  );
}
