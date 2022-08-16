import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSelected } from '../../store/devicesSliceNew';

export default function ModuleId({ index, deviceId, dinId }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const dins = useSelector((state) => state.dinsNew.dins);
  const groups = useSelector((state) => state.groupsNew.groups);

  const onClickHandler = (e) => {
    let shift = false;
    if (e.shiftKey) {
      shift = true;
    }
    dispatch(updateSelected({ deviceId, shift, dins, groups }));
  };

  return (
    <div
      className={
        settings.display.numeration
          ? 'device__id'
          : 'device__id device__id-hide'
      }
      onClick={onClickHandler}
    >
      {index}
    </div>
  );
}
