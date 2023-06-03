import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const HandlePlaceOrder = (
  setOpenAlert,
  setOpenBackDrop,
  setMessage,
  setAlertType,
  orderItems,
  fetchedData,
  paymentMethod,
  address,
  city,
  state,
  country,
  zip
) => {
  const token = cookies.get("accessToken");
  const handleDeleteCart = () => {
    const configuration = {
      method: "delete",
      url: `${process.env.REACT_APP_API}ecomm/api/v1/cart/`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };

    axios(configuration)
      .then((res) => {
        setUpdate(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const configuration = {
    method: "post",
    url: `${process.env.REACT_APP_API}ecomm/api/v1/CreateOrder`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },

    data: {
      orderItems: orderItems,
      totalPrice: fetchedData.totalPrice,
      paymentMethod: paymentMethod,
      shippingAddress: {
        address: address,
        city: city,
        state: state,
        country: country,
        zip: zip,
      },
    },
  };
  setOpenBackDrop(true);
  axios(configuration)
    .then(async (res) => {
      await handleDeleteCart();
      setOpenBackDrop(false);
      setAlertType("success");
      setMessage(
        res.response.data.message
          ? res.response.data.message
          : "Order Placed Sucessfully"
      );
      setOpenAlert(true);
      navigate("/checkout");
    })
    .catch((error) => {
      setOpenBackDrop(false);
      setAlertType("error");
      setMessage(
        error.response.data.message
          ? error.response.data.message
          : "Something Went Wrong Try Again"
      );
      setOpenAlert(true);
      console.log(error);
    });

  return;
};

export default HandlePlaceOrder;
