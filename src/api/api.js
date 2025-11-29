import axios from "axios";
import { getUser } from "../storage/storage";

export const API = axios.create({
  baseURL: "http://192.168.1.22:5000/api",
});

// Auto add token to all requests
API.interceptors.request.use(async (config) => {
  const data = await getUser();
  if (data?.token) {
    config.headers.Authorization = "Bearer " + data.token;
  }
  return config;
});
