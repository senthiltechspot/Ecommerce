import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AddToCart = (
  id,
  setOpenAlert,
  setOpenBackDrop,
  setMessage,
  setAlertType,
  fetchCartItems
) => {
  return new Promise((resolve, reject) => {
    const token = cookies.get("accessToken");

    if (token) {
      setOpenBackDrop(true);
      axios
        .post(
          `${process.env.REACT_APP_API}ecomm/api/v1/cart/add`,
          {
            productId: id,
            quantity: 1,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (result) => {
          await fetchCartItems();
          setOpenBackDrop(false);
          setAlertType("success");
          setMessage("Item Added To Cart");
          setOpenAlert(true);
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          setOpenBackDrop(false);
          setAlertType("error");
          setMessage(
            error.response?.data.message ||
              "Cart Add Unsuccessful. Please try again!"
          );
          setOpenAlert(true);
          reject(error);
        });
    } else {
      setAlertType("info");
      setMessage("Kindly login into your account to add items to the cart");
      setOpenAlert(true);
      reject(new Error("User not logged in"));
    }
  });
};

export default AddToCart;
