import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.1.22:5000/api", // << replace with your local IP!
});
