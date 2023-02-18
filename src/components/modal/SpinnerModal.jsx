import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const SpinnerModal = () => {
  const spinnerData = useSelector((state) => state.layers.spinnerData);
  const spinnerDataFromNotificationStore = useSelector(
    (state) => state.notificationsStore.spinnerDataFromNotificationStore
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (spinnerData || spinnerDataFromNotificationStore) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [spinnerData, spinnerDataFromNotificationStore]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default SpinnerModal;
