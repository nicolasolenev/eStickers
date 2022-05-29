import React, { useState } from 'react';

export default function SingleModule(props) {
  const [point, setPoint] = useState(false);

  return (
    <div className="single-module">
      <div className="single-module__where">Где?</div>

      <div className="single-module__point">
        <span
          onClick={() => setPoint(!point)}
          className={
            !point ? 'point-circle' : 'point-circle point-circle_active'
          }
        ></span>
      </div>

      <div className="single-module__designation">QF1</div>

      <div className="single-module__caption">Надпись, название линии</div>

      <div className="single-module__phase">Фаза</div>

      <div className="single-module__id">{props.id}</div>
      {props.children}
    </div>
  );
}
