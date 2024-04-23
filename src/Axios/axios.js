import axios from "axios";

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}/api`,
});

Axios.interceptors.request.use((config) => {
  let userObj = JSON.parse(sessionStorage.getItem("userObj"));
  if (userObj && userObj.token) {
    config.headers.Authorization = "Bearer " + userObj.token;
  }
  return config;
});

export default Axios;
