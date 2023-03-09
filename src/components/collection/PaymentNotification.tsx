import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";

const PaymentNotification = () => {
  const dispatch: any = useDispatch();
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );
  const receiptData = useSelector(
    (state: any) => state.collectionsStore.receiptData
  );
  const [totalValue, setTotalValue] = useState();

  useEffect(() => {
    if (receiptData) {
      setTotalValue(receiptData.total);
    }
  }, [receiptData]);

  const closePaymentNotificationHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ClosePaymentNotification,
      })
    );
  };
  const showPaymentFormHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ClosePaymentNotification,
      })
    );
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowPaymentForm,
      })
    );
  };

  return (
    <div className="payment-notification-card-main-container">
      <div className="payment-notification-card-header">
        <div className="payment-notification-x-in-header">
          <i
            onClick={closePaymentNotificationHandler}
            className="bi bi-x-lg payment-notification-bi-x-lg"
          ></i>
        </div>
      </div>
      <p className="payment-notification-component-body-text">
        Please make a payment before generating and downloading{" "}
        {collection.collection.collectionSize} NFTs
      </p>
      <p className="generate-collection-modal-body-price">${totalValue}</p>

      <div className="cancel-and-continue-buttons-container-in-payment-notification-component">
        <button
          type="reset"
          className="cancel-button-in-payment-notification-component"
          onClick={closePaymentNotificationHandler}
        >
          Cancel
        </button>
        <button
          type="reset"
          className="continue-button-in-payment-notification-component"
          onClick={showPaymentFormHandler}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentNotification;
