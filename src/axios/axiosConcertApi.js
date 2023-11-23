import axios from "axios";

export const axiosConcertApi = axios.create({
    baseURL : "http://ticket-verse.azurewebsites.net/api",
    headers : {
     "Content-Type":" application/json"
    }
})
