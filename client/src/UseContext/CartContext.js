import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

//create a context, with createContext api
export const cartContext = createContext();

const cookies = new Cookies();
const CartProvider = (props) => {
  // this state will be shared with all components
  //   Cart
  const [totalCartItems, setTotalCartItems] = useState(null);
  // const [FetchCart, setFetchCart] = useState("");
  const token = cookies.get("accessToken");
  // Handle Cart Get Request

  useEffect(() => {
    fetchCartItems();
  }, []);
  const fetchCartItems = () => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    axios
      .get(`${process.env.REACT_APP_API}ecomm/api/v1/cart/items`, {
        headers: headers,
      })
      .then((response) => {
        setTotalCartItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // this is the provider providing state
    <cartContext.Provider value={{ totalCartItems, fetchCartItems }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartProvider;
