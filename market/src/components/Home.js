import React, { useContext, useState, useEffect } from "react";
import Dashbord from "./adminComponents/Dashbord";
import Signup from "./Signup";
import Login from "./Login";

import { Link } from "react-router-dom";
import HomeProducts from "./HomeProducts";
import { UsersContext } from "./context/UseridContext";
import AllProducts from "./AllProducts";
import { LoginUserContext } from "./context/LoginUserContext";

const Home = (props) => {
  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);

  let reguser = props.location.state;
  let userData = props.userData;

  const [userID, setUserId] = useState(props.location.state);

  return (
    <React.Fragment>
      <main>
        <div className="banner container-full">
          <div className="banner-content">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-interval="2000">
                  <div className="banner-text text1">
                    <h5>BEST OFFER SALE !</h5>
                    <h2>Up To 20% Off Organic Fruits</h2>
                    <p>valid until 25th of May</p>
                  </div>
                </div>
                <div className="carousel-item" data-interval="2000">
                  <div className="banner-text text2">
                    <h5>BEST OFFER SALE !</h5>
                    <h2>Up To 50% Off Fresh Juices</h2>
                    <p>valid until 25th of May</p>
                  </div>
                </div>
                <div className="carousel-item" data-interval="2000">
                  <div className="banner-text text3">
                    <h5>BEST OFFER SALE !</h5>
                    <h2>Up To 30% Off Organic Herbs</h2>
                    <p>valid until 25th of May</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="./images/bannar1.png" alt="" />
        </div>

        <div className="services main-container">
          <div className="services-items">
            <div className="service">
              <img src="./images/service1.png" alt="" />
              <h5>free shipping</h5>
            </div>
            <div className="service">
              <img src="./images/service2.png" alt="" />
              <h5>Contactless delivery</h5>
            </div>
            <div className="service">
              <img src="./images/service3.png" alt="" />
              <h5>secured payment</h5>
            </div>
            <div className="service">
              <img src="./images/service4.png" alt="" />
              <h5>24/7 support</h5>
            </div>
          </div>
        </div>

        <div className="special-category-main">
          <h2>best sellers categories</h2>
          <div className="special-category">
            <div className="category">
              <img src="./images/category1.jpg" alt="" />
              <div className="description">
                <h4>vegetables</h4>
                <Link to="/vegetables">
                  <button className="btn btn-dark btn-sm">view -></button>
                </Link>
              </div>
            </div>
            <div className="category">
              <img src="./images/category2.jpg" alt="" />
              <div className="description">
                <h4>fruits</h4>
                <Link to="/fruits">
                  <button className="btn btn-dark btn-sm">view -></button>
                </Link>
              </div>
            </div>
            <div className="category">
              <img src="./images/category3.jpg" alt="" />
              <div className="description">
                <h4>can food</h4>
                <button className="btn btn-dark btn-sm">view -></button>
              </div>
            </div>
          </div>
        </div>

        <div className="special-category-main">
          <h2>MOST POPULAR</h2>
          <div className="special-category">
            <div className="category">
              <img src="./images/category4.jpg" alt="" />
              <div className="description">
                <h4>fresh salads</h4>
                <button className="btn btn-dark btn-sm">view -></button>
              </div>
            </div>
            <div className="category">
              <img src="./images/category5.jpg" alt="" />
              <div className="description">
                <h4>bakery products</h4>
                <Link to="/bakery">
                  <button className="btn btn-dark btn-sm">view -></button>
                </Link>
              </div>
            </div>
            <div className="category">
              <img src="./images/category6.jpg" alt="" />
              <div className="description">
                <h4>diary products</h4>
                <button className="btn btn-dark btn-sm">view -></button>
              </div>
            </div>
          </div>
        </div>
        <div className="main-container mt-4">
          <h2 className="mt-4">Recently Added</h2>
          <HomeProducts reguser={reguser} />
          <h2 className="mt-4">All Products</h2>
          <AllProducts reguser={reguser} />
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
