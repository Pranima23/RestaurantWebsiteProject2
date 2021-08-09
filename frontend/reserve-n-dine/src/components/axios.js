import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: 'Bearer' + localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/',
  },
});

export default axiosInstance;
