import axios from "axios";

const instance = axios.create({

  baseURL: "https://api.trustex.kg",
  //baseURL: "https://localhost:7085",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;
