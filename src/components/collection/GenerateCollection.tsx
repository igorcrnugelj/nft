import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import {
  generateCollection,
  getCollections,
  getEthereumPriceInUsd,
  getGeneratedCollection,
  setGeneratedCollection,
  setTransactionStatus,
  setReceiptData,
} from "../../store/actions/Collection-actions";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";
import PaymentFormModal from "../modal/PaymentFormModal";
import { ethers } from "ethers";
import Web3 from "web3";

const GenerateCollection = () => {
  const dispatch: any = useDispatch();
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );
  const receiptData = useSelector(
    (state: any) => state.collectionsStore.receiptData
  );
  const transactionStatus = useSelector(
    (state: any) => state.collectionsStore.transactionStatus
  );
  const user = useSelector((state: any) => state.loginStore.user);
  const [isGenerating, setIsGenerating] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [showPaymentFormModal, setShowPaymentFormModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [subtotalValue, setSubtotalValue] = useState();
  const [vatValue, setVatValue] = useState();
  const [totalValue, setTotalValue] = useState();
  const [ethValue, setEthValue]: any = useState();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    if (collection.collection.generating === true) {
      setIsGenerating(true);
    } else if (collection.collection.generating === false) {
      setIsGenerating(false);
    }
  }, [collection]);
  useEffect(() => {
    if (receiptData) {
      setSubtotalValue(receiptData.subtotal);
      setVatValue(receiptData.vat);
      setTotalValue(receiptData.total);
      setEthValue(receiptData.eth);
    }
  }, [receiptData]);
  useEffect(() => {
    if (transactionStatus === 1) {
      setShowPaymentSuccess(true);
    }
  }, [transactionStatus]);

  const generateCollectionHandler = async () => {
    const getEthereumPriceInUsdResponse = await dispatch(
      getEthereumPriceInUsd()
    ).unwrap();

    const subtotal = 1.16 * collection.collection.collectionSize;
    const subtotalFixed = subtotal.toFixed(2);
    const vat = (subtotal * 25) / 100;
    const vatFixed = vat.toFixed(2);
    const total = subtotal + vat;
    const totalFixed: any = total.toFixed(2);
    const ethValue =
      (1 / getEthereumPriceInUsdResponse.data.priceUsd) * totalFixed;
    const receiptData = {
      subtotal: subtotalFixed,
      vat: vatFixed,
      total: totalFixed,
      eth: ethValue,
    };
    dispatch(setReceiptData(receiptData));
    setModalShow(true);
  };
  const generateCollectionHandler2 = async () => {
    setShowPaymentFormModal(false);
    dispatch(setTransactionStatus(null));
    const collectionData = {
      userId: user.userId,
      collectionId: collection.collection.collectionId,
    };
    const generateCollectionResponse = await dispatch(
      generateCollection(collectionData)
    ).unwrap();
    if (generateCollectionResponse.success) {
      //tu počinje novi kod ********************************************************************************************
      dispatch(getCollections());

      const evtSource = new EventSource(
        `http://63.35.234.60:3000/stream?collectionId=${collection.collection.collectionId}`
      );

      evtSource.onopen = function () {
        console.log("Connection to server opened.");
        console.log(evtSource.readyState);
      };

      evtSource.onmessage = function (e) {
        const obj = JSON.parse(e.data);
        console.log(obj);
        if (obj.iteration !== null) {
          const objIterationValue = obj.iteration;
          const objTotalValue = obj.total;
          let progressPercentage = (objIterationValue / objTotalValue) * 100;
          setPercentage(progressPercentage);
          console.log(objIterationValue, objTotalValue);

          const getGeneratedCollectionFunction = async (id: any) => {
            await wait(4000);
            const getGeneratedCollectionResponse = await dispatch(
              getGeneratedCollection(id)
            ).unwrap();

            if (!getGeneratedCollectionResponse.success) {
              console.log("Could not fetch collection,please try again!");
            } else {
              dispatch(
                setGeneratedCollection(getGeneratedCollectionResponse.data)
              );
              dispatch(
                setMainPanelBodyDataType({
                  type: MainPanelDataType.ShowDownloadButton,
                })
              );
            }
            dispatch(getCollections());
          };

          if (obj.completed === true) {
            evtSource.close();
            setIsGenerating(false);
            getGeneratedCollectionFunction(collection.collection.collectionId);
          }
        } else {
          setPercentage(2);
        }
      };

      evtSource.onerror = function (e) {
        console.log("error: ", e);
      };
      //tu završava novi kod ************************************************************************************************
    }
  };
  function wait(timeout: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  const showPaymentFormModalHandler = () => {
    setShowPaymentFormModal(true);
    setModalShow(false);
  };

  const closePaymentFormModalHandler = (status: any) => {
    setShowPaymentFormModal(false);
  };

  async function makeAPaymentHandler() {
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

  return (
    <Fragment>
      {!isGenerating ? (
        <button
          type="reset"
          className="generate-collection-button"
          onClick={generateCollectionHandler}
        >
          GENERATE COLLECTION
        </button>
      ) : (
        <button
          type="reset"
          className="generate-collection-button"
          onClick={generateCollectionHandler}
        >
          GENERATE COLLECTION
          <ProgressBar
            className="progress-bar"
            now={percentage}
            animated={true}
            label={`${percentage}%`}
            style={{ backgroundColor: "#b2b2b2" }}
          />
        </button>
      )}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        // centered
        // size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* <i className="bi bi-trash" /> */}
            {/* <p className="generate-collection-modal-header-text">
              Your {collection.collection.collectionSize} NFTs are successfully
              generated!
            </p> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="generate-collection-modal-body-text">
            Please make a payment before generating and downloading{" "}
            {collection.collection.collectionSize} NFTs
          </p>
          <p className="generate-collection-modal-body-price">${totalValue}</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="delete-and-cancel-buttons-container">
            <button
              type="reset"
              className="generate-collection-cancel-button-in-modal"
              // onClick={deleteCollectionHandler}
            >
              Cancel
            </button>
            <button
              type="reset"
              className="generate-collection-continue-button-in-modal"
              onClick={showPaymentFormModalHandler}
            >
              Continue
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {showPaymentFormModal && (
        // <PaymentFormModal
        //   show={showPaymentFormModal}
        //   modalClose={closePaymentFormModalHandler}
        // />
        <Modal
          show={showPaymentFormModal}
          onHide={() => setShowPaymentFormModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          // centered
          // size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {/* <i className="bi bi-trash" /> */}
              <p className="payment-form-modal-header-logo">
                d<span className="payment-form-modal-header-logo-span">3</span>
                vlab
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="payment-form-modal-body-container">
              <div className="payment-form-modal-body-subtotal-container">
                <p className="payment-form-modal-body-subtotal-text">
                  Subtotal
                </p>
                <p className="payment-form-modal-body-subtotal-amount">
                  ${subtotalValue}
                </p>
              </div>
              <div className="payment-form-modal-body-tax-container">
                <p className="payment-form-modal-body-tax-text">VAT</p>
                <p className="payment-form-modal-body-tax-amount">{vatValue}</p>
              </div>
              <div className="payment-form-modal-body-total-container">
                <p className="payment-form-modal-body-total-text">Total</p>
                <div className="payment-form-modal-body-total-amount-container">
                  <p className="payment-form-modal-body-total-amount">
                    ${totalValue}
                  </p>
                  <p className="payment-form-modal-body-total-amount">
                    (ETH{ethValue})
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <div className="delete-and-cancel-buttons-container"> */}
            {/* <button
              type="reset"
              className="generate-collection-cancel-button-in-modal"
              onClick={deleteCollectionHandler}
            >
              Cancel
            </button> */}
            <div className="payment-form-modal-footer-ethereum-container">
              <p className="payment-form-modal-footer-ethereum-text">
                ADD PAYMENT
              </p>
              <button
                type="reset"
                className="payment-form-modal-footer-ethereum-button"
                onClick={makeAPaymentHandler}
              >
                <img
                  className="ethereum-logo-in-payment-form-button"
                  src="media/img/ether-logo.png"
                ></img>
                Ethereum
              </button>
            </div>
            {showPaymentSuccess && (
              <div className="success-crypto-payment">
                <p>Payment Successful!</p>
                <button
                  type="reset"
                  className="generate-collection-continue-button-in-modal"
                  onClick={generateCollectionHandler2}
                >
                  Continue
                </button>
              </div>
            )}
            {/* </div> */}
          </Modal.Footer>
        </Modal>
      )}
    </Fragment>
  );
};

export default GenerateCollection;
