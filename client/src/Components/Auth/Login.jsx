import React, { useContext, useState } from "react";
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
import HandleLogin from "../../Handlers/HandleLogin";
import { alertContext } from "../../UseContext/AlertContext";
const cookies = new Cookies();

const Login = ({ handleflipLogin, handleCloseModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [logged, setLogged] = useState(0);

  // Hide/Show Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const value = useContext(alertContext);
  const {
    OpenAlert,
    setOpenAlert,
    Message,
    setMessage,
    AlertType,
    setAlertType,
    openBackDrop,
    setOpenBackDrop,
  } = value;
  const handleSubmit = (e) => {
    e.preventDefault();
    HandleLogin(
      username,
      password,
      handleCloseModal,
      setOpenAlert,
      setOpenBackDrop,
      setMessage,
      setAlertType
    );
  };

  return (
    <div>
      <div>
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
