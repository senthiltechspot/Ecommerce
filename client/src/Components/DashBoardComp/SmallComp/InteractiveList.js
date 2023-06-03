import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Cookies from "universal-cookie";
import { Snackbar, Alert, Divider } from "@mui/material";
import { categoryContext } from "../../../UseContext/CategoryContext";
const cookies = new Cookies();
const token = cookies.get("accessToken");

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList({
  from,
  searchProductname,
  data,
  deleteiItem,
}) {
  // const [dense, setDense] = React.useState(false);
  // const [secondary, setSecondary] = React.useState(false);
  // const [openSnackBar, setOpenSnackBar] = React.useState(false);
  // const [openError, setOpenError] = React.useState(false);

  // const handleClickError = () => {
  //   setOpenError(true);
  // };

  // const handleSucess = () => {
  //   setOpenSnackBar(true);
  //   setisupdate(true);
  // };

  // const handleClosesnackbar = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenError(false);
  //   setOpenSnackBar(false);
  //   setisupdate(false);
  // };
  // const [data, setData] = React.useState([]);

  // const token = cookies.get("accessToken");

  // React.useEffect(() => {
  //   const headers = {
  //     Authorization: token,
  //     "Content-Type": "application/json",
  //   };
  //   axios
  //     .get(Url, { headers })
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [isupdate]);
  // const { Categorydata, fetchCategory } = React.useContext(categoryContext);

  // Handle Delete Request
  // const [response, setResponse] = React.useState(null);

  // const handleDelete = (id) => {
  //   const headers = {
  //     Authorization: token,
  //     "Content-Type": "application/json",
  //   };
  //   setOpenBackDrop(true);

  //   axios
  //     .delete(`${Url}${id}`, { headers })
  //     .then((res) => {
  //       setResponse(res.data);
  //       fetchdata();
  //       setOpenBackDrop(false);
  //       setMessage("Deleted SucessFully");
  //       setAlertType("success");
  //       setOpenAlert(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setOpenBackDrop(false);
  //       setMessage("Unable to Delete, kindly Try Again !");
  //       setAlertType("error");
  //       setOpenAlert(true);
  //       // handleClickError();
  //     });
  // };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          List of All {from}
        </Typography>
        <Demo>
          {data ? (
            searchProductname ? (
              data
                .filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(searchProductname.toLowerCase())
                )
                .map((items) => (
                  <List key={items._id}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteiitem(items._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={items.name} />
                    </ListItem>
                    <Divider />
                  </List>
                ))
            ) : (
              data.map((items) => (
                <List key={items._id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteiItem(items._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={items.name} />
                  </ListItem>
                  <Divider />
                </List>
              ))
            )
          ) : (
            <List>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary="Category Not Found"
                  secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            </List>
          )}
        </Demo>
      </Grid>

      {/* <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sucessfully Deleted
        </Alert>
      </Snackbar>
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
          Unable to Delete
        </Alert>
      </Snackbar> */}
    </Box>
  );
}
