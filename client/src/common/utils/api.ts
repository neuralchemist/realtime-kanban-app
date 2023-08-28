import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL as string | undefined;
console.log("baseURL: ", baseURL);

export const axiosInstance = axios.create({
  baseURL,
});
