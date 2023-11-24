import axios from "axios";

export const axiosConcertApi = axios.create({
  baseURL: "https://ticket-verse.azurewebsites.net",
  headers: {
    "Content-Type": " application/json",
  },
});
