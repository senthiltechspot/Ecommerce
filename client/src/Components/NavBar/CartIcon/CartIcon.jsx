import { Badge, Button } from "@mui/material";
import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../../UseContext/CartContext";

const CartIcon = () => {
  const navigate = useNavigate();
  const value = useContext(cartContext);
  const { totalCartItems } = value;

  return (
    <Button
      variant="text"
      color="warning"
      onClick={() => navigate("/Cart")}
      sx={{ marginLeft: "auto" }}
    >
      <Badge
        badgeContent={totalCartItems ? totalCartItems.totalItems : 0}
        color="secondary"
      >
        <ShoppingCartIcon fontSize="small" />
      </Badge>
    </Button>
  );
};

export default CartIcon;
