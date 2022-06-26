import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modalRoot');

export default function Modal({ title, onCancel, onSubmit, children }) {
  const overlayClickHandler = (e) => {
    if (e.target.className === 'modal-overlay') {
      onCancel();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={overlayClickHandler}>
      <div className="modal">
        <div className="modal__header">{title}</div>

        <div className="modal__body">{children}</div>

        <div className="modal__footer">
          <button
            className="modal__button modal__button_submit"
            onClick={onSubmit}
          >
            Save
          </button>

          <button
            className="modal__button modal__button_cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
