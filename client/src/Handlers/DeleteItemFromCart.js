import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const DeleteItemFromCart = (
  id,
  setOpenAlert,
  setOpenBackDrop,
  setMessage,
  setAlertType,
  setUpdate
) => {
  const token = cookies.get("accessToken");

  const configuration = {
    method: "delete",
    url: `${process.env.REACT_APP_API}ecomm/api/v1/cart/items/${id}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  setOpenBackDrop(true);
  axios(configuration)
    .then((res) => {
      setOpenBackDrop(false);
      setAlertType("success");
      setMessage("Item Deleted From the Cart");
      setOpenAlert(true);
      setUpdate(true);
    })
    .catch((error) => {
      console.log(error);
      setOpenBackDrop(false);
      setAlertType("error");
      setMessage(
        error.response.data.message
          ? error.response.data.message
          : "Something Went Wrong Try Again"
      );
      setOpenAlert(true);
    });
  return {};
};

export default DeleteItemFromCart;
