import Cookies from "universal-cookie";

const cookies = new Cookies();
const HandleLogout = () => {
  console.log("logout treiggered");
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("username", { path: "/" });
  cookies.remove("email", { path: "/" });
  cookies.remove("userType", { path: "/" });
  return (window.location.href = "/");
};

export default HandleLogout;
