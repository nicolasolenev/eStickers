import React from 'react';
import { useDispatch } from 'react-redux';

import { addNewGroup } from '../../addDevicesFns';

export const AddGroupBtn = ({ dinId }) => {
  const dispatch = useDispatch();

  const addHandler = () => {
    addNewGroup(dispatch, dinId);
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
