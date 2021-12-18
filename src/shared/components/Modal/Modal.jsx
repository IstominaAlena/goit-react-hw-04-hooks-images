import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import Button from "../Button";

import s from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.addEventListener("keydown", close);

    return () => {
      window.addEventListener("keydown", close);
    };
  }, []);

  function close(e) {
    if (e.code === "Escape") {
      return closeModal();
    }
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  return createPortal(
    <div className={s.overlay} onClick={close}>
      <div className={s.modal}>
        <Button
          type="button"
          text="&#128473;"
          onClick={close}
          className="modal-close"
        />
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
};
