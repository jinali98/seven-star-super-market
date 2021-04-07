import React, { useState, useContext } from "react";
// import { UsersContext } from "../context/UsersContext";
import Axios from "axios";
import { Link } from "react-router-dom";

const NewPerson = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessge] = useState("");

  const nameChangeHandler = (e) => {
    let name = e.target.value;
    setName(name);
  };
  const emailChangeHandler = (e) => {
    let email = e.target.value;
    setEmail(email);
  };
  const passwordChangeHandler = (e) => {
    let password = e.target.value;
    setPassword(password);
  };

  //to add a new user pass data to the backend
  const addNewUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/addUser", {
      name: name,
      email: email,
      password: password,
    })
      .then(() => {
        setMessge("Successfully Registered.");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        setMessge("Error! Please try again");
      });
  };

  return (
    <div className="main-container mt-4">
      <div className="row mt-4">
        <div className="col-md-5 col-sm-10 offset-sm-2 offset-md-4 mt-4">
          <h1 className="users">Add a New User</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 col-sm-4 offset-sm-2 offset-md-3">
          <form onSubmit={addNewUser}>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1 mt-4">Name</label>
              <input
                type="text"
                onChange={nameChangeHandler}
                value={name}
                required
                className="form-control"
                placeholder="Jane Doe"
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1 mt-4">Email address</label>
              <input
                type="email"
                onChange={emailChangeHandler}
                value={email}
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
                value={password}
                required
                className="form-control"
                id="exampleInputPassword1"
                placeholder="********"
              />
            </div>
            <button type="submit" className="btn btn-warning mr-2">
              Add User
            </button>
            <Link to="/users">
              <button className="btn btn-warning">Home</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPerson;
