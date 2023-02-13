import { useState } from "react";

const LoginForm = () => {
  const [walletAddress, setWalletAddress] = useState();
  const [showConnectToMetaMaskButton, setShowConnectToMetaMaskButton] =
    useState(false);

  async function requestAccount() {
    if (window.ethereum) {
      console.log("deteched");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      console.log("MetaMask not deteched");
    }
  }
  const checkForMetaMaskPublicAddressHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      setShowConnectToMetaMaskButton(true);
      connectToMetMaskHandler();
    }
  };
  const connectToMetMaskHandler = async () => {
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
          onClick={connectToMetMaskHandler}
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
