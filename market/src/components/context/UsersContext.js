import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";

export const UsersContext = createContext();

export const UserProvider = (props) => {
  const [allUsers, setAllUsers] = useState([]);

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setAllUsers(response.data);
    });
  }, []);

  return (
    <UsersContext.Provider
      value={([allUsers, setAllUsers], [userID, setUserID])}
    >
      {props.children}
    </UsersContext.Provider>
  );
};
