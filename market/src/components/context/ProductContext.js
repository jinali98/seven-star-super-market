import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [viewItem, setViewItem] = useState({
    id: null,
    name: "",
    price: "",
    category: "",
  });

  return (
    <ProductContext.Provider value={[viewItem, setViewItem]}>
      {props.children}
    </ProductContext.Provider>
  );
};
