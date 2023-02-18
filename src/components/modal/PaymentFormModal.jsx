import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const PaymentFormModal = (show, modalClose) => {
  const [modalShow, setModalShow] = useState(show);

  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered

      // size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* <i className="bi bi-trash" /> */}
          <p className="payment-form-modal-header-logo">
            d<span className="payment-form-modal-header-logo-span">3</span>vlab
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="payment-form-modal-body-container">
          <div className="payment-form-modal-body-subtotal-container">
            <p className="payment-form-modal-body-subtotal-text">Subtotal</p>
            <p className="payment-form-modal-body-subtotal-amount">$150</p>
          </div>
          <div className="payment-form-modal-body-tax-container">
            <p className="payment-form-modal-body-tax-text">VAT</p>
            <p className="payment-form-modal-body-tax-amount">$150</p>
          </div>
          <div className="payment-form-modal-body-total-container">
            <p className="payment-form-modal-body-total-text">Total</p>
            <p className="payment-form-modal-body-total-amount">$150</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="delete-and-cancel-buttons-container">
          {/* <button
            type="reset"
            className="generate-collection-cancel-button-in-modal"
            onClick={deleteCollectionHandler}
          >
            Cancel
          </button> */}
          <button
            type="reset"
            className="generate-collection-continue-button-in-modal"
            // onClick={showCollectionDetailsHandler}
          >
            Continue
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentFormModal;
