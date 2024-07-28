import React from "react";
import "./modal.css";

type ModalProps = {
  active: boolean;
  setActive: any;
  children: React.ReactNode;
};

const Modal = ({ active, setActive, children }: ModalProps) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
