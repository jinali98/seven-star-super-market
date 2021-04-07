import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Axios from "axios";

export default function NavButton() {
  return (
    <div>
      <Link to="/login">
        <button className="btn btn-outline-warning mr-2">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn btn-outline-warning">Signup</button>
      </Link>
    </div>
  );
}
