import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginUserContext } from "./context/LoginUserContext";
import Axios from "axios";
import NavButton from "./NavButton";
import NavDashbord from "./NavDashbord";
import NavLogged from "./NavLoggedButton";

const Nav = (props) => {
  let history = useHistory();
  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);

  return (
    <div className="fixed-top nav-container-main">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4 link-set-main">
          {/* <!-- i gave a className name link-set, link-set-main -->
          <!-- main nav bar --> */}
          <div className="link-set">
            <Link to="/fruits" className="nav-link">
              fruits
            </Link>
            <Link to="/vegetables" className="nav-link">
              vegetables
            </Link>
            <a className="nav-link" href="#">
              meat
            </a>
          </div>
          <div className="link-set">
            <a className="nav-link" href="#">
              diary
            </a>
            <a className="nav-link" href="#">
              nuts
            </a>
            <a className="nav-link" href="#">
              sweets
            </a>
          </div>
          <div className="link-set">
            <a className="nav-link" href="#">
              can food
            </a>
            <a className="nav-link" href="#">
              fresh salads
            </a>
            <Link to="/bakery" className="nav-link">
              bakery products
            </Link>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark subNavBar">
        <button
          className="navbar-toggler main-heading-part"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <div></div>
            <div></div>
            <div></div>
          </span>
        </button>
        {/* <!-- <div className="bottomNavBar"> --> */}

        <div className="heading-part">
          <div className="user">
            {userLoginId > 0 ? (
              userLoginId === 100100 ? (
                <NavDashbord />
              ) : (
                <NavLogged />
              )
            ) : (
              <NavButton />
            )}
          </div>
          <div className="cart-display">
            <Link to="/cart">
              <i className="fas fa-shopping-cart fa-2x item1" />
            </Link>
            <Link to="/">
              <i className="fas fa-home fa-2x" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Nav;
