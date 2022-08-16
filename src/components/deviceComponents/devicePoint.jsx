import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDeviceNormallyOn } from '../../store/devicesSliceNew';

export default function DevicePoint({ deviceId }) {
  const dispatch = useDispatch();

  const device = useSelector((state) => state.devicesNew.devices[deviceId]);

  const pointHandler = () => {
    dispatch(
      toggleDeviceNormallyOn({
        deviceId,
      })
    );
  };

  return (
    <div
      className="device__point"
      tabIndex={0}
      onClick={pointHandler}
      onKeyDown={(e) => {
        if (e.code === 'Space') {
          e.preventDefault();
          pointHandler();
        }
      }}
    >
      <span
        className={
          !device.normallyOn.value
            ? 'point-circle'
            : 'point-circle point-circle_active'
        }
        style={{
          display: `${device.normallyOn.isVisible ? 'inline-block' : 'none'}`,
        }}
      ></span>
    </div>
  );
}
