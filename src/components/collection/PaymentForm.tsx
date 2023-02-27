import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import { ethers } from "ethers";
import {
  setStartGeneratingCollectionsProcess,
  setTransactionStatus,
} from "../../store/actions/Collection-actions";

const PaymentForm = () => {
  const dispatch: any = useDispatch();
  const receiptData = useSelector(
    (state: any) => state.collectionsStore.receiptData
  );
  const transactionStatus = useSelector(
    (state: any) => state.collectionsStore.transactionStatus
  );
  const [subtotalValue, setSubtotalValue] = useState();
  const [vatValue, setVatValue] = useState();
  const [totalValue, setTotalValue] = useState();
  const [ethValue, setEthValue]: any = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [activateLoader, setActivateLoader] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    if (receiptData) {
      setSubtotalValue(receiptData.subtotal);
      setVatValue(receiptData.vat);
      setTotalValue(receiptData.total);
      setEthValue(receiptData.eth.toFixed(9));
    }
  }, [receiptData]);

  useEffect(() => {
    if (transactionStatus === 1) {
      setShowPaymentSuccess(true);
      setActivateLoader(false);
    }
  }, [transactionStatus]);

  //********************************************************* */
  async function makePaymentHandler() {
    setShowPaymentConfirmation(true);
    var Web3 = require("web3");
    const weiValue =
      "0x" +
      Number(Web3.utils.toWei(ethValue.toString(), "ether")).toString(16);

    console.log("weiValue: ", weiValue);
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
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
    }
    const TransactionHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: walletAddress,
          // to: "0x524262c141da06c4a1cd44756801363eb0b90c7f",
          to: "0x41e3B5f8fE115aE102F08d389B286Df9E28C9dc8",
          // value: "0x29a2241af62c0000",
          value: weiValue,
          // gasPrice: "0x09184e72a000",
          // gas: "0x2710",
        },
      ],
    });
    console.log("TransactionHash: ", TransactionHash);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.waitForTransaction(TransactionHash);
    // const signer = provider.getSigner();
    const resolve = await window.ethereum.request({
      method: "eth_getTransactionByHash",
      params: [TransactionHash],
    });
    console.log(resolve);

    dispatch(setTransactionStatus(receipt.status));

    console.log("Receipt: ", receipt);
  }

  //*********************************************************** */

  const startGeneratingCollectionsProcessHandler = () => {
    dispatch(setStartGeneratingCollectionsProcess(true));
  };

  const closePaymentFormHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ClosePaymentForm,
      })
    );
  };

  return (
    <div className="payment-form-main-container">
      <div className="payment-form-card-header">
        <p className="payment-form-header-logo">
          d<span className="payment-form-header-logo-span">3</span>
          vlab
        </p>
        <i
          onClick={closePaymentFormHandler}
          className="bi bi-x-lg payment-form-bi-x-lg"
        ></i>
      </div>
      <div className="payment-form-body-subtotal-container">
        <p className="payment-form-body-subtotal-text">Subtotal</p>
        <p className="payment-form-body-subtotal-amount">${subtotalValue}</p>
      </div>
      <div className="payment-form-body-vat-container">
        <p className="payment-form-body-vat-text">VAT</p>
        <p className="payment-form-body-vat-amount">{vatValue}</p>
      </div>
      <div className="payment-form-body-total-container">
        <p className="payment-form-body-total-text">Total</p>
        <div className="payment-form-body-total-amount-container">
          <p className="payment-form-body-total-amount">${totalValue}</p>
          <p className="payment-form-body-total-amount">(ETH{ethValue})</p>
        </div>
      </div>
      <div className="payment-form-footer-ethereum-container">
        <p className="payment-form-footer-ethereum-text">ADD PAYMENT</p>
        {!showPaymentConfirmation ? (
          <button
            type="reset"
            className="payment-form-footer-ethereum-button"
            onClick={makePaymentHandler}
          >
            <img
              className="ethereum-logo-in-payment-form-button"
              src="media/img/ether-logo.png"
            ></img>
            Ethereum
          </button>
        ) : (
          <button
            type="reset"
            className="payment-form-footer-ethereum-confirmation-button"
            onClick={makePaymentHandler}
            onMouseUp={() => setActivateLoader(true)}
          >
            <img
              className="ethereum-logo-in-payment-form-button"
              src="media/img/ether-logo.png"
            ></img>
            {!activateLoader ? (
              "Confirm payment"
            ) : (
              <div className="lds-ellipsis">
                processing
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </button>
        )}
      </div>
      {showPaymentSuccess && (
        <div className="success-crypto-payment">
          <p>Payment Successful!</p>
          <button
            type="reset"
            className="generate-collection-continue-button-in-modal"
            onClick={startGeneratingCollectionsProcessHandler}
          >
            Start Generating Collections
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
