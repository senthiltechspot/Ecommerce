import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { alertContext } from "./AlertContext";

//create a context, with createContext api
export const productContext = createContext();

const cookies = new Cookies();

const ProductProvider = (props) => {
  // this state will be shared with all components
  // Fetch Category Data
  const { setOpenAlert, setMessage, setAlertType, setOpenBackDrop } =
    useContext(alertContext);

  const [ProductData, setProductsData] = useState([]);

  const token = cookies.get("accessToken");

  useEffect(() => {
    fetchProducts();
  }, []);

  //   const fetch = (url) => {};
  const fetchProducts = () => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    axios
      .get(`${process.env.REACT_APP_API}ecomm/api/v1/products/`, { headers })
      .then((response) => {
        setProductsData(response.data);

        console.log(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   Create Category
  const CreateProduct = (data) => {
    // Handle Create Request
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API}ecomm/api/v1/products/`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    // const handleCreate = (e) => {
    setOpenBackDrop(true);

    axios(configuration)
      .then((result) => {
        fetchProducts();
        setOpenBackDrop(false);
        setMessage("Product Created SucessFully");
        setAlertType("success");
        setOpenAlert(true);
      })
      .catch((error) => {
        setOpenBackDrop(false);
        setMessage("Unable to Product Category, kindly Try Again !");
        setAlertType("error");
        setOpenAlert(true);
        console.log(error);
      });
    // };
  };

  //   Delete Category
  const DeleteProduct = (id) => {
    // const handleDelete = (id) => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    setOpenBackDrop(true);

    axios
      .delete(`${process.env.REACT_APP_API}ecomm/api/v1/products/${id}`, {
        headers,
      })
      .then((res) => {
        fetchProducts();
        setOpenBackDrop(false);
        setMessage("Deleted SucessFully");
        setAlertType("success");
        setOpenAlert(true);
      })
      .catch((error) => {
        console.log(error);
        setOpenBackDrop(false);
        setMessage("Unable to Delete, kindly Try Again !");
        setAlertType("error");
        setOpenAlert(true);
        // handleClickError();
      });
    // };
  };
  return (
    // this is the provider providing state
    <productContext.Provider
      value={{ ProductData, fetchProducts, CreateProduct, DeleteProduct }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductProvider;
