import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModuleId from './moduleId';
import { setModuleText } from '../../store/modulesSliceNew';

export default function Module({ moduleId, deviceId, groupId, dinId }) {
  const dispatch = useDispatch();
  const module = useSelector((state) => state.main.modules[moduleId]);
  // const module = useSelector((state) => state.modulesNew.modules[moduleId]);
  const [text, setText] = useState(module.text);

  const inputHandler = (e) =>
    dispatch(
      setModuleText({
        text: e.target.value,
        moduleId,
      })
    );

  return (
    <div className="device__module">
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

      <ModuleId
        index={module.index}
        deviceId={deviceId}
        groupId={groupId}
        dinId={dinId}
      />
    </div>
  );
}
