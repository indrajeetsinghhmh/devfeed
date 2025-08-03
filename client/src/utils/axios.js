import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // or your deployed backend URL
});

export default API;
