import React from 'react';
import { useDispatch } from 'react-redux';

import { addGroup } from '../../store/mainSlice';

export const AddGroupBtn = ({ dinId }) => {
  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(addGroup({ dinId }));
  };

  return (
    <div className="devices__add">
      <button className="devices__add-btn" onClick={addHandler}>
        +
      </button>
    </div>
  );
};

export default AddGroupBtn;
