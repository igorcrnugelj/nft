import axios from "axios";
import environment from "./environment";

export const nftClient = axios.create({
  baseURL: environment.dev.baseUrl,
  timeout: 10000,
});

export const setNftClientToken = (token: any) => {
  nftClient.defaults.headers["Authorization"] = `Bearer ${token}`;
};
