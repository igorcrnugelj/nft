import { useState } from "react";
import { ethers } from "ethers";

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState("");

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

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    }
  }

  async function makeAPaymentHandler() {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: walletAddress,
          to: "0x524262c141da06c4a1cd44756801363eb0b90c7f",
          value: "0x29a2241af62c0000",
        },
      ],
    });
    console.log(txHash);
  }

  //TODO: activate "requestAccount" function on connect wallet button only if we decide to keep this component live
  return (
    <div>
      {/* <button onClick={requestAccount}>Request Account</button> */}
      <button className="connect-wallet-button" onClick={connectWallet}>
        Connect Wallet
      </button>
      <h3>Wallet Address: {walletAddress}</h3>
      <button className="connect-wallet-button" onClick={makeAPaymentHandler}>
        Make a payment
      </button>
    </div>
  );
};

export default Wallet;
