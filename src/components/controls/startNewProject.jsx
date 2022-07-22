import React from 'react';
import { useDispatch } from 'react-redux';

import { setModal } from '../../store/modalSlice';

export default function StartNewProject() {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(setModal({ type: 'isNeedSave' }));
          setTimeout(() => dispatch(setModal({ isVisible: true })), 0);
        }}
        className="button"
      >
        Новый проект
      </button>
    </>
  );
}
