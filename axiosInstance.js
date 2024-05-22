import axios from "axios";
import { APIURL } from "./lib/ApiKey";

export const axiosInstance = axios.create({
    baseURL: APIURL,
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true'
    }
  })