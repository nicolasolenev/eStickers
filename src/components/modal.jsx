import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setModal } from '../store/modalSlice';

const modalRoot = document.getElementById('modalRoot');

export default function Modal({ title, onCancel, onSubmit, children }) {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const overlayClickHandler = (e) => {
    if (e.target.className === 'modal-overlay') {
      dispatch(setModal({ isVisible: false }));
      setTimeout(() => dispatch(setModal({ type: '' })), 300);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onMouseDown={overlayClickHandler}>
      <div className={modal.isVisible ? 'modal modal-active' : 'modal'}>
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
