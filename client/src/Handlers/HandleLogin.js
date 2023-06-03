import axios from "axios";
import React, { useContext } from "react";
import { alertContext } from "../UseContext/AlertContext";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const HandleLogin = (
  username,
  password,
  handleCloseModal,
  setOpenAlert,
  setOpenBackDrop,
  setMessage,
  setAlertType
) => {
  //   const value = useContext(alertContext);
  //   const {
  //     OpenAlert,
  //     setOpenAlert,
  //     Message,
  //     setMessage,
  //     AlertType,
  //     setAlertType,
  //     openBackDrop,
  //     setOpenBackDrop,
  //   } = value;

  const configuration = {
    method: "post",
    url: `${process.env.REACT_APP_API}ecomm/api/v1/auth/signin`,
    data: {
      username: username,
      password: password,
    },
  };
  setOpenBackDrop(true);

  axios(configuration)
    .then((result) => {
      if (!result.data.accessToken) {
        //   handleLoginError();
      } else {
        cookies.set("accessToken", result.data.accessToken, {
          path: "/",
        });
        cookies.set("username", result.data.username, {
          path: "/",
        });
        cookies.set("email", result.data.email, {
          path: "/",
        });
        cookies.set("userType", result.data.userType, {
          path: "/",
        });
        // window.location.href = "/";
        setOpenBackDrop(false);
        setAlertType("success");
        setMessage("Login Sucessfull");
        setOpenAlert(true);
        handleCloseModal();
      }
      console.log(result);
    })
    .catch((error) => {
      setOpenBackDrop(false);
      setAlertType("error");
      setMessage(error.response.data.message);
      setOpenAlert(true);
      console.log(error);
    });

  return;
};

export default HandleLogin;
