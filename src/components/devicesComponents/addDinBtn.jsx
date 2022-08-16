import React from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { addNewGroup } from '../../addDevicesFns';
import { addDin } from '../../store/dinsSliceNew';

export const AddDinBtn = () => {
  const dispatch = useDispatch();

  const addHandler = () => {
    const id = nanoid();

    dispatch(addDin({ id }));
    addNewGroup(dispatch, id);
  };

  return (
    <button className="add_din_btn" onClick={addHandler}>
      Add DIN
    </button>
  );
};

export default AddDinBtn;
