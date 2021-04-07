import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import { LoginUserContext } from "./components/context/LoginUserContext";
import Dashbord from "./components/adminComponents/Dashbord";
import Home from "./components/Home";
import Login from "./components/Login";
import Item from "./components/Item";
import Cart from "./components/Cart";
import NewPerson from "./components/adminComponents/NewPerson";
import Vegetables from "./components/productRoutes/Vegetables";
import Fruits from "./components/productRoutes/Fruits";
import Bakery from "./components/productRoutes/Bakery";
import Users from "./components/adminComponents/Users";
import Products from "./components/adminComponents/Products";
import NewProduct from "./components/adminComponents/NewProduct";
import UpdateProduct from "./components/adminComponents/UpdateProduct";
import UpdateUser from "./components/adminComponents/UpdateUser";
import Cash from "./components/payments/Cash";
import Visa from "./components/payments/Visa";
import Track from "./components/Track";
import Orders from "./components/adminComponents/Orders";
import UpdateOrder from "./components/adminComponents/UpdateOrder";
import BilledItems from "./components/adminComponents/BilledItems";
import { Switch, Route } from "react-router-dom";

const App = (props) => {
  const [userLoginId, setUserLoginId] = useState(0);

  // to get the logged user's user id and store that in the state
  useEffect(() => {
    let getItemfromsotrage = localStorage.getItem("userID");

    if (getItemfromsotrage) {
      setUserLoginId(getItemfromsotrage);
    }
  }, []);

  return (
    <div>
      <LoginUserContext.Provider value={{ userLoginId, setUserLoginId }}>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/dashbord" component={Dashbord}></Route>
          <Route exact path="/users" component={Users}></Route>
          <Route exact path="/products" component={Products}></Route>
          <Route exact path="/visa/:id" component={Visa}></Route>
          <Route exact path="/cash/:id" component={Cash}></Route>
          <Route exact path="/newproduct" component={NewProduct}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/vegetables" component={Vegetables}></Route>
          <Route exact path="/fruits" component={Fruits}></Route>
          <Route exact path="/bakery" component={Bakery}></Route>
          <Route exact path="/item/:id" component={Item}></Route>
          <Route exact path="/updatestatus/:id" component={UpdateOrder}></Route>
          <Route exact path="/billedItems" component={BilledItems}></Route>
          <Route
            exact
            path="/updateProduct/:id"
            component={UpdateProduct}
          ></Route>
          <Route exact path="/updateUser/:id" component={UpdateUser}></Route>
          <Route exact path="/cart" component={Cart}></Route>
          <Route exact path="/newPerson" component={NewPerson}></Route>
          <Route exact path="/track" component={Track}></Route>
          <Route exact path="/order" component={Orders}></Route>
        </Switch>
      </LoginUserContext.Provider>
    </div>
  );
};

export default App;
