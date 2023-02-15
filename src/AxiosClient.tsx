import axios from "axios";

export const nftClient = axios.create({
  baseURL: "https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev",
  timeout: 10000,
});

export const setNftClientToken = (token: any) => {
  nftClient.defaults.headers["Authorization"] = `Bearer ${token}
  )}`;
};
