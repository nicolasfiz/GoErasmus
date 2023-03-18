import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function ToastComponent(title, showToast, closeToast) {
  return (
    <ToastContainer
      className="p-3"
      position={"top-center"}
    >
      <Toast
        autohide={true}
        show={showToast}
        bg={'success'}
        onClose={closeToast}
      >
        <Toast.Header closeButton={false}>
            <strong className="me-auto">{title}</strong>
            <button
              type="button"
              style = {{borderRadius: "50%"}}
              className="ml-auto mb-1 close"
              data-dismiss="toast"
            >
              <span>&times;</span>
            </button>
        </Toast.Header>
      </Toast>
    </ToastContainer>
    )
}