import React, { useState } from "react";
import Register from "../../Auth/Register";
import Login from "../../Auth/Login";
import { Box, Modal } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ openModal, handleCloseModal }) => {
  const [flipislogin, setFlipislogin] = useState(false);

  const handleflipLogin = () => setFlipislogin(!flipislogin);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="d-flex justify-content-center">
        {flipislogin ? (
          <Register handleflipLogin={handleflipLogin} />
        ) : (
          <Login
            handleflipLogin={handleflipLogin}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
