import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import { ethers } from "ethers";
import {
  calculateWei,
  getApprovalToken,
  setStartGeneratingCollectionsProcess,
  setTransactionHash,
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
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );

  const [subtotalValue, setSubtotalValue] = useState();
  const [vatValue, setVatValue] = useState();
  const [totalValue, setTotalValue] = useState();
  const [ethValue, setEthValue]: any = useState();
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
  const makePaymentHandler = async () => {
    const weiValue = dispatch(calculateWei(ethValue));

    let walletAddress = null;
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      walletAddress = userObj.publicAddress;
    }

    const token = await dispatch(
      getApprovalToken(collection.collection.collectionId)
    ).unwrap();

    let TransactionHash = null;
    try {
      TransactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: walletAddress,
            to: "0x41e3B5f8fE115aE102F08d389B286Df9E28C9dc8",
            value: weiValue.weiValue,
            data: token.token,
          },
        ],
      });
      if (TransactionHash) {
        setActivateLoader(true);
      }
    } catch (error: any) {
      setActivateLoader(false);
      closePaymentFormHandler();
    }

    dispatch(setTransactionHash(TransactionHash));
    console.log("TransactionHash: ", TransactionHash);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.waitForTransaction(TransactionHash);
    const resolve = await window.ethereum.request({
      method: "eth_getTransactionByHash",
      params: [TransactionHash],
    });
    dispatch(setTransactionStatus(receipt.status));
    console.log("Receipt: ", receipt);
    dispatch(setStartGeneratingCollectionsProcess(true));
  };

  //*********************************************************** */
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
        <button
          type="reset"
          className={
            !activateLoader
              ? "payment-form-footer-ethereum-button"
              : "payment-form-footer-ethereum-button-processing"
          }
          onClick={makePaymentHandler}
        >
          <img
            className="ethereum-logo-in-payment-form-button"
            src="media/img/ether-logo.png"
          ></img>
          {!activateLoader ? (
            " Ethereum"
          ) : (
            <div className="loader-and-text-container-in-payment-form">
              processing
              <span className="loader-in-payment-form"></span>
            </div>
          )}
        </button>
      </div>
      {showPaymentSuccess && (
        <div className="success-crypto-payment">
          <p>Payment Successful!</p>
          <p>Generate collection started!</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
