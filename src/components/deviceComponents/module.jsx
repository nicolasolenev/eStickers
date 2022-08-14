import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModuleId from './moduleId';
import { setModuleText } from '../../store/devicesSlice';

export default function Module({ moduleId }) {
  const dispatch = useDispatch();
  const module = useSelector((state) => state.modulesNew.modules[moduleId]);
  const [text, setText] = useState(module.text);

  const inputHandler = (e) => null;
  // dispatch(
  //   setModuleText({
  //     text: e.target.value,
  //     deviceId,
  //     groupId,
  //     moduleId: module.id,
  //     dinId,
  //   })
  // );

  return (
    <div className="device__module" style={{ width: `${module.width}mm` }}>
      <input
        className="device__module-input"
        placeholder="L1"
        value={text}
        onFocus={(e) => {
          setTimeout(function () {
            e.target.selectionStart = e.target.selectionEnd = 10000;
          }, 0);
        }}
        onChange={(e) => setText(e.target.value)}
        onBlur={inputHandler}
      />

      <ModuleId index={module.index} />
    </div>
  );
}
