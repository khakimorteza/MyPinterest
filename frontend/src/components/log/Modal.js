import React from "react";
import "../../css/Modal.css";

export const Modal = ({ children }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">{children}</div>
    </div>
  );
};
