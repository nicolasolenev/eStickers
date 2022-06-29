import React, { useState, useEffect } from 'react';

export default function Button({ value, tip, isDisabled, onClickHandler }) {
  const [hovering, setHovering] = useState(false);
  let hover = false;

  useEffect(() => {
    if (isDisabled) {
      setTimeout(() => setHovering(false), 500);
    }
  }, [isDisabled, onClickHandler]);

  const onMousOverHandler = () => {
    hover = true;
    setTimeout(() => {
      if (hover) {
        setHovering(true);
      }
    }, 500);
  };

  const onMouseOutHandler = () => {
    hover = false;
    setHovering(false);
  };

  return (
    <div className="button-wrapper">
      <button
        className="button"
        disabled={isDisabled}
        onClick={onClickHandler}
        onMouseOver={onMousOverHandler}
        onMouseOut={onMouseOutHandler}
      >
        {value}
      </button>

      {hovering && <div className="button-tip">{tip}</div>}
    </div>
  );
}
