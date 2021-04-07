import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/UsersContext";
import Axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers")
      .then((response) => {
        console.log(response.data);
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUsers = (iduser) => {
    Axios.delete(`http://localhost:3001/deleteUsers/${iduser}`);
  };

  return (
    <div className="main-container mt-4">
      <h1 className="users">User Information</h1>
      <Link to="/newPerson">
        <button className="mt-4 btn btn-warning">Add New User</button>
      </Link>
      <Link to="/dashbord">
        <button className="mt-4 ml-4 btn btn-warning">Dashbord</button>
      </Link>
      <div className="searching mt-2">
        <input
          className="form-control mr-sm-2 searchBar"
          type="search"
          placeholder="Search By User Name"
          aria-label="Search"
          onChange={(event) => {
            setSearchItem(event.target.value);
          }}
        />
      </div>
      <table class="table mt-4">
        <thead class="thead-dark">
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allUsers
            .filter((val) => {
              if (searchItem === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchItem.toLowerCase())
              ) {
                return val;
              }
            })
            .map((user) => {
              return (
                <tr key={user.iduser}>
                  <td>{user.iduser}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Link to={"/updateUser/" + user.iduser}>
                      <button className="btn btn-success mr-2">Update</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => deleteUsers(user.iduser)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
