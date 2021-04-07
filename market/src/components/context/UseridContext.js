import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";

export const UsersContext = createContext();

export const UserProvider = (props) => {
  const [userID, setUserID] = useState();

  return (
    <UsersContext.Provider value={[userID, setUserID]}>
      {props.children}
    </UsersContext.Provider>
  );
};
