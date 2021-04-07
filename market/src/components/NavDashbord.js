import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginUserContext } from "./context/LoginUserContext";

import Axios from "axios";

export default function NavDashbord() {
  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);
  let history = useHistory();
  const AdminLogout = () => {
    localStorage.clear();
    setUserLoginId(0);
    history.push({
      pathname: "/",
      state: 0,
    });
  };

  return (
    <div>
      <button className="btn btn-outline-warning mr-2" onClick={AdminLogout}>
        LogOut
      </button>

      <Link to="/dashbord">
        <button className="btn btn-outline-warning">Dashbord</button>
      </Link>
    </div>
  );
}
