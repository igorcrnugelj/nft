import axios from "axios";

export const nftClient = axios.create({
  baseURL: "https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev",
  timeout: 10000,
});

export const setNftClientToken = (token: any) => {
  nftClient.defaults.headers["Authorization"] = `Bearer ${token}`;
};

// nftClient.interceptors.response.use(
//   (response) => {
//     console.log("RESPONSE: ", response);
//     return response;
//   },
//   function (error) {
//     console.log("ERROR: ", error);
//     if (error.response.status === 401) {
//       console.log("401 ERROR EJECTED!!!");
//       return Promise.reject(error.response);
//     }
//   }
// );
