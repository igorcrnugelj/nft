import React from "react";
import { useDispatch, useStore } from "react-redux";
import { nftClient } from "../../AxiosClient";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setUnauthorizedError } from "../../store/actions/LoginActions";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";

const setupInterceptor = (store: any) => {
  //   const dispatch: any = useDispatch();
  nftClient.interceptors.response.use(
    (response) => {
      console.log("RESPONSE: ", response);
      return response;
    },
    (error) => {
      console.log("ERROR: ", error);
      if (error.response.status === 401) {
        console.log("401 ERROR EJECTED!!!: ", error.response);
        localStorage.removeItem("user");
        store.dispatch(setUnauthorizedError(true));

        return Promise.reject(error);
      }
    }
  );
};

export default setupInterceptor;
