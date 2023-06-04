import axios from "axios";

export const makeRequest = axios.create({
  baseURL:
    process.env.REACT_APP_PRODUCTION === "YES"
      ? "https://club.hotelgreenlandbd.com/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});

// http://localhost:5000/api
// https://club.hotelgreenlandbd.com/api
