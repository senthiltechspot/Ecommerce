import React from "react";

export const HandleRegister = () => {
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [openError, setOpenError] = React.useState(false);

//   const handleClickError = () => {
//     setOpenError(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpenError(false);
//   };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const configuration = {
    method: "post",
    url: `${process.env.REACT_APP_API}ecomm/api/v1/auth/signup`,
    data: {
      name: name,
      username: username,
      email: email,
      password: password,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios(configuration)
      .then((result) => {
        handleflipLogin();
        handleSucess();
      })
      .catch((error) => {
        handleClickError();
        console.log(error);
      });
  };
  return {};
};
