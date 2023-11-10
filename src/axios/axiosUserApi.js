import axios from "axios";

export const axiosUserApi = axios.create({
    baseURL : "http://localhost:3001",
    headers : {
     "Content-Type":" application/json"
    }
})