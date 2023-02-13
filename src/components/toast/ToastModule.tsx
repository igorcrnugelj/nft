import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastModule = () => {
  const [showToast, setShowToast] = useState(true);
  const [message, setMessage] = useState("");
  const toastData = useSelector(
    (state: any) => state.notificationsStore.toastData
  );

  useEffect(() => {
    if (toastData) {
      setShowToast(true);
      setMessage(toastData.data);
    }
  }, [toastData]);

  if (!toastData) {
    return <></>;
  }

  return (
    <Fragment>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          className="d-inline-block m-1"
          bg="warning"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Fragment>
  );
};

export default ToastModule;
