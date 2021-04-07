import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "../components/context/UsersContext";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { LoginUserContext } from "./context/LoginUserContext";

const Login = (props) => {
  const [userNameReg, setUserNameReg] = useState("");
  const [userPasswordReg, setUserPasswordReg] = useState("");

  const [regUserId, setRegUserId] = useState();
  const [regUserName, setRegUserName] = useState("");

  let history = useHistory();
  const [isLogged, setIsLogged] = useState();

  const { userLoginId, setUserLoginId } = useContext(LoginUserContext);

  useEffect(() => {
    let getItemfromsotrage = localStorage.getItem("userID");

    if (getItemfromsotrage) {
      setUserLoginId(getItemfromsotrage);
    }
    // get the session and check if there is a session and update the reguserid
  }, []);

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      userNameReg: userNameReg,
      userPasswordReg: userPasswordReg,
    })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("userID", response.data[0].iduser);
          if (
            userNameReg === "admin@admin.com" &&
            userPasswordReg === "admin"
          ) {
            setUserLoginId(response.data[0].iduser);
            history.push({
              pathname: "/dashbord",
              state: response.data[0].iduser,
            });
          } else {
            setUserLoginId(response.data[0].iduser);
            history.push({
              pathname: "/",
              state: response.data[0].iduser,
            });
          }

          setUserNameReg("");
          setUserPasswordReg("");
        }
      })
      .catch(() => {
        console.log("Invalid User name or Password");
      });
  };

  const emailChangeHandler = (e) => {
    setUserNameReg(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setUserPasswordReg(e.target.value);
  };

  return (
    <div className="main-container mt-4">
      <div className="row mt-4">
        <div className="col-md-5 col-sm-10 offset-sm-2 offset-md-4 mt-4">
          <h1 className="users">Login to Shopping!</h1>
          <p>
            Not a registered User? <Link to="/signup">Register</Link> to
            shopping{" "}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-4 offset-sm-2 offset-md-3">
          <form onSubmit={login}>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1 mt-4">User Name</label>
              <input
                type="email"
                onChange={emailChangeHandler}
                value={userNameReg}
                required
                className="form-control"
                id="exampleInputEmail1"
                placeholder="jane@gmail.com"
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputPassword1 mt-4">Password</label>
              <input
                type="password"
                onChange={passwordChangeHandler}
                value={userPasswordReg}
                required
                className="form-control"
                id="exampleInputPassword1"
                placeholder="********"
              />
            </div>
            <button type="submit" className="btn btn-warning mr-2">
              Login
            </button>
            <Link to="/">
              <button className="btn btn-warning">Home</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
