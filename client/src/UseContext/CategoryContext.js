import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { alertContext } from "./AlertContext";

//create a context, with createContext api
export const categoryContext = createContext();

const cookies = new Cookies();

const CategoryProvider = (props) => {
  // this state will be shared with all components
  // Fetch Category Data
  const { setOpenAlert, setMessage, setAlertType, setOpenBackDrop } =
    useContext(alertContext);

  const [Categorydata, setCategoryData] = useState([]);

  const token = cookies.get("accessToken");

  useEffect(() => {
    fetchCategory();
  }, []);

  //   const fetch = (url) => {};
  const fetchCategory = () => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    axios
      .get(`${process.env.REACT_APP_API}ecomm/api/v1/category/`, { headers })
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   Create Category
  const CreateCategory = (name) => {
    // Handle Create Request
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API}ecomm/api/v1/category/`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        name: name,
      },
    };

    // const handleCreate = (e) => {
    setOpenBackDrop(true);

    axios(configuration)
      .then((result) => {
        fetchCategory();
        setOpenBackDrop(false);
        setMessage("Category Created SucessFully");
        setAlertType("success");
        setOpenAlert(true);
      })
      .catch((error) => {
        setOpenBackDrop(false);
        setMessage("Unable to Create Category, kindly Try Again !");
        setAlertType("error");
        setOpenAlert(true);
        console.log(error);
      });
    // };
  };

  //   Delete Category
  const DeleteCategory = (id) => {
    // const handleDelete = (id) => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    setOpenBackDrop(true);

    axios
      .delete(`${process.env.REACT_APP_API}ecomm/api/v1/category/${id}`, {
        headers,
      })
      .then((res) => {
        //   setResponse(res.data);
        fetchCategory();
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
    <categoryContext.Provider
      value={{ Categorydata, fetchCategory, CreateCategory, DeleteCategory }}
    >
      {props.children}
    </categoryContext.Provider>
  );
};

export default CategoryProvider;
