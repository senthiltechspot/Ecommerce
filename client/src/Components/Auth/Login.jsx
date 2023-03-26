import React, { useState } from "react";
import {
  Typography,
  FormControl,
  TextField,
  Stack,
  Button,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Box,
  Alert,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = ({ handleflipLogin, handleLoginSucess, handleCloseModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [logged, setLogged] = useState(0);
  const [showPassword, setShowPassword] = React.useState(false);

  const [openError, setOpenError] = React.useState(false);

  const handleLoginError = () => {
    setOpenError(true);
  };

  const handleClosesnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const configuration = {
    method: "post",
    url: `${process.env.REACT_APP_API}/ecomm/api/v1/auth/signin`,
    data: {
      username: username,
      password: password,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(configuration)
      .then((result) => {
        if (!result.data.accessToken) {
          handleLoginError();
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
          // window.location.href = "/";
          handleLoginSucess();
          handleCloseModal();
        }
        console.log(result);
      })
      .catch((error) => {
        // setLogged(1);
        handleLoginError();
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        {/* Alert Notification */}
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClosesnackbar}
        >
          <Alert
            onClose={handleClosesnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            Unable to find User/email
          </Alert>
        </Snackbar>

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
                alignItems: "center",
              }}
            >
              <Typography variant="h2" style={{ fontWeight: "bolder" }}>
                LogIn
              </Typography>
              <FormControl sx={{ width: "84%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Username">
                  Username
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-Username"
                  type="text"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <br />

              <FormControl sx={{ width: "84%" }}>
                <InputLabel htmlFor="standard-adornment-password">
                  Password *
                </InputLabel>
                <OutlinedInput
                  required
                  id="standard-adornment-password"
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
              <br />
              <Button variant="contained" type="submit">
                LogIn
              </Button>
              <br />
              <Typography variant="h8" style={{ fontWeight: "bolder" }}>
                Don't Have a Account
              </Typography>
              <br />

              <Button variant="contained" onClick={() => handleflipLogin()}>
                Sign Up
              </Button>
            </Box>
          </form>
        </Stack>
      </div>
    </div>
  );
};

export default Login;
