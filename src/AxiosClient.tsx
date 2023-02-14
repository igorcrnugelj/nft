import axios from "axios";
import React from "react";

const client = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
  });

  const get = (url: any) => {
    instance.get(url);
  };

  return get;
};

export default client;
