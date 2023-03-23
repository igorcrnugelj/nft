import axios from "axios";
import environment from "./environment";
import axiosRetry from "axios-retry";

export const nftClient = axios.create({
  baseURL: environment.dev.baseUrl,
  timeout: 10000,
});

axiosRetry(nftClient, {
  retries: 10,
  retryDelay: () => {
    return 1000;
  },
  retryCondition: (error) => {
    return true;
  },
});

export const setNftClientToken = (token: any) => {
  nftClient.defaults.headers["Authorization"] = `Bearer ${token}`;
};
