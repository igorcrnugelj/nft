import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  getJwtToken,
  getNonce,
  setMetaMaskWalletAddress,
} from "../../store/actions/Login";
import Web3 from "web3";
import { setNftClientToken } from "../../AxiosClient";

const LoginForm = () => {
  const dispatch = useDispatch();
  const walletAddressFromStore = useSelector(
    (state) => state.loginStore.walletAddress
  );
  const [walletAddress, setWalletAddress] = useState();
  const [showConnectToMetaMaskButton, setShowConnectToMetaMaskButton] =
    useState(false);
  const [metamaskWalletValue, setmetamaskWalletValue] = useState("");

  useEffect(() => {
    if (walletAddressFromStore) {
      setmetamaskWalletValue(walletAddressFromStore);
    }
  }, [walletAddressFromStore]);

  async function requestAccount() {
    if (window.ethereum) {
      console.log("deteched");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        const getNonceResponse = await dispatch(getNonce(accounts[0])).unwrap();
        if (getNonceResponse.success) {
          var Web3 = require("web3");
          var web3 = new Web3(Web3.givenProvider);
          await web3.eth.personal.sign(
            getNonceResponse.data.nonce,
            getNonceResponse.data.publicAddress,
            async function (error, signature) {
              console.log("signature: ", signature);
              const dataForJwtToken = {
                publicAddress: getNonceResponse.data.publicAddress,
                signature: signature,
              };
              const getJwtTokenResponse = await dispatch(
                getJwtToken(dataForJwtToken)
              ).unwrap();
              if (getJwtTokenResponse.success) {
                console.log("JWT Token: ", getJwtTokenResponse.data);
                setNftClientToken(getJwtTokenResponse.data.token);
              }
            }
          );
        } else {
          if (getNonceResponse.data.response.data.error) {
            const publicAddressData = {
              publicAddress: accounts[0],
            };
            const createUserResponse = await dispatch(
              createUser(publicAddressData)
            ).unwrap();
            if (createUserResponse.success) {
              console.log("user: ", createUserResponse.data);
              //web3.personal.sign(nonce, web3.eth.coinbase, callback);
              var Web3 = require("web3");
              const signature = await Web3.personal.sign(
                createUserResponse.data.nonce,
                createUserResponse.data.publicAddress,
                () => {}
              );
              console.log("signature: ", signature);
            }
          }
        }
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      console.log("MetaMask not deteched");
    }
  }
  const checkForMetaMaskPublicAddressHandler = async () => {
    console.log("test");
    if (typeof window.ethereum !== "undefined") {
      setShowConnectToMetaMaskButton(true);
      connectToMetaMaskHandler();
    }
  };
  const connectToMetaMaskHandler = async () => {
    await requestAccount();
  };
  return (
    <div className="login-form-main-container">
      <img className="matamask-logo" src="media/img/metamask_logo.png"></img>
      <p className="metamask-text">MetaMask</p>
      {!showConnectToMetaMaskButton && (
        <button
          onClick={checkForMetaMaskPublicAddressHandler}
          className="metamask-login-button"
        >
          <img
            className="matamask-logo-in-metamask-login-button"
            src="media/img/metamask_logo.png"
          ></img>
          Login with your{" "}
          <span className="matamask-text-in-metamask-login-button">
            MetaMask
          </span>{" "}
          wallet
        </button>
      )}
      {showConnectToMetaMaskButton && (
        <button
          onClick={connectToMetaMaskHandler}
          className="metamask-login-button"
        >
          <img
            className="matamask-logo-in-metamask-login-button"
            src="media/img/metamask_logo.png"
          ></img>
          Connect with your{" "}
          <span className="matamask-text-in-metamask-login-button">
            MetaMask
          </span>{" "}
          wallet
        </button>
      )}
      <p>{walletAddress}</p>
    </div>
  );
};

export default LoginForm;
