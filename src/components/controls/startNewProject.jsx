import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '../../store/modalSlice';
import localization from '../../localization';

export default function StartNewProject() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const lang = settings.localization;

  return (
    <>
      <button
        onClick={() => {
          dispatch(setModal({ type: 'isNeedSave' }));
          setTimeout(() => dispatch(setModal({ isVisible: true })), 0);
        }}
        className="button"
      >
        {localization.controls.project.button[lang]}
      </button>
    </>
  );
}
