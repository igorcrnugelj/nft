import { ethers } from "ethers";
import { Fragment } from "ethers/lib/utils";
import React, { useState } from "react";

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

  return (
    <div>
      {/* <button onClick={requestAccount}>Request Account</button> */}
      <button className="connect-wallet-button" onClick={connectWallet}>
        Connect Wallet
      </button>
      <h3>Wallet Address: {walletAddress}</h3>
    </div>
  );
};

export default Wallet;
