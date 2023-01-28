import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://science-club-app-server-production.up.railway.app",
  withCredentials: true,
});
