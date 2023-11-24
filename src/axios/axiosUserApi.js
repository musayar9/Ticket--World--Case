import axios from "axios";

export const axiosUserApi = axios.create({
  baseURL: "http://localhost:5030/api",
  headers: {
    "Content-Type": " application/json",
  },
});
