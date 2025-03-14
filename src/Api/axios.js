import axios from "axios";

const axiosInstance = axios.create({
  // local instance of amazon api
  // baseURL: "http://127.0.0.1:5001/e-clone-2024-54d41/us-central1/api",
  //deploy version of amazon api on render
   baseURL: "https://amazone-api-deploy-r4dw.onrender.com",
});
export { axiosInstance };
