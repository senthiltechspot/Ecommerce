import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  Stack,
  Button,
  Typography,
  Alert,
  Box,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
} from "@mui/material";

// import Snackbar from "@mui/material/Snackbar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const Register = ({ handleflipLogin, handleSucess }) => {
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openError, setOpenError] = React.useState(false);

  const handleClickError = () => {
    setOpenError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

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
        // handleSucess();
      })
      .catch((error) => {
        // handleClickError();
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        {/* Alert Notification */}
        {/* <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Unable to register User/email all ready used
          </Alert>
        </Snackbar> */}

        {/* Form */}
        <Stack
          direction="row"
          spacing={2}
          padding={5}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box
              sx={{ display: "flex", flexDirection: "column" }}
              style={{
                padding: "50px",
                backgroundColor: "aliceblue",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Typography variant="h2" style={{ fontWeight: "bolder" }}>
                Register
              </Typography>
              <TextField
                required
                id="name"
                label="name"
                variant="standard"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <br />
              <TextField
                required
                id="username"
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <FormControl>
                <TextField
                  required
                  type={"email"}
                  id="email"
                  label="   Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <br />

              <FormControl>
                <InputLabel htmlFor="standard">Password *</InputLabel>
                <Input
                  required
                  variant="standard"
                  id="standard"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <FormHelperText id="my-helper-text">
                We'll never share your details.
              </FormHelperText>
              <br />

              <Button variant="contained" type="submit">
                Register
              </Button>
              <br />
              <Typography variant="h8" style={{ fontWeight: "bolder" }}>
                Already Have a Account
              </Typography>
              <br />

              <Button variant="contained" onClick={() => handleflipLogin()}>
                Login
              </Button>
            </Box>
          </form>
        </Stack>
      </div>
    </div>
  );
};

export default Register;
