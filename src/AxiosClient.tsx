import axios from "axios";
import environment from "./environment";

export const nftClient = axios.create({
  // baseURL: "https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev",
  baseURL: environment.dev.baseUrl,
  timeout: 10000,
});

export const setNftClientToken = (token: any) => {
  nftClient.defaults.headers["Authorization"] = `Bearer ${token}`;
};
