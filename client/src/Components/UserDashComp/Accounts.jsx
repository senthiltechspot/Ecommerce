import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const cookies = new Cookies();

const tableborder = {
  borderWidth: 0,
  borderWidth: 1,
  borderColor: "black",
  borderStyle: "solid",
};

const Accounts = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  // Decrypting User using accessToken
  const token = cookies.get("accessToken");

  useEffect(() => {
    const token = cookies.get("accessToken");
    if (token) {
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    }
  }, [token]);
  return (
    <div>
      <div className={"d-flex gap-3 justify-content-center"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell sx={tableborder} align="centre">
                  Username :
                </TableCell>
                <TableCell sx={tableborder} align="centre">
                  {decodedToken != null
                    ? decodedToken.user.username
                    : "Your UserName"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={tableborder} align="centre">
                  Name :
                </TableCell>
                <TableCell sx={tableborder} align="centre">
                  {decodedToken != null ? decodedToken.user.name : "Your Name"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={tableborder} align="centre">
                  Email :
                </TableCell>
                <TableCell sx={tableborder} align="centre">
                  {decodedToken != null ? decodedToken.user.email : "Your Name"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={tableborder} align="centre">
                  User id :
                </TableCell>
                <TableCell sx={tableborder} align="centre">
                  {decodedToken != null ? decodedToken.user._id : "Your Name"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Accounts;
