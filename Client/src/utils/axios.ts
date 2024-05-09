import axios from "axios";
import { BASE_URL } from "./constants";

const noteeAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default noteeAPI;
