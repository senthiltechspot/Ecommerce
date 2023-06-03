import axios from "axios";

const BASE_URL = process.env.REACT_APP_API;

export async function userSignUp(data) {
  return axios.post(`${BASE_URL}ecomm/api/v1/auth/signup`, data);
}

export async function userSignIn(data) {
  return axios.post(`${BASE_URL}ecomm/api/v1/auth/signin`, data);
}
