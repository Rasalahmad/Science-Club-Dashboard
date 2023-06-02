import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://club.hotelgreenlandbd.com/api",
  withCredentials: true,
});

// http://localhost:5000/api
