import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getEmitHelpers } from "typescript";
import "../../css/layout/header.scss";

const Header = () => {
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    if (window.ethereum) {
      console.log("deteched");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
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
    }
  }

  return (
    <div className="header-container">
      <p className="header-logo">
        d<span className="header-logo-span">3</span>vlab
      </p>
      <div className="header-menu">
        <Link className="header-menu-item" to={"/home"}>
          Home
        </Link>

        <Link className="header-menu-item" to={"/generator"}>
          Generator
        </Link>

        <Link className="header-menu-item" to={"#"}>
          Pricing
        </Link>
        <Link
          className="header-menu-item"
          to={"/wallet"}
          onClick={requestAccount}
        >
          Wallet
        </Link>
      </div>
    </div>
  );
};

export default Header;
