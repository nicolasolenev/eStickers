import React from 'react';

export default function Button({ value, tip, isDisabled, onClickHandler }) {
  return (
    <div className="button-wrapper">
      <button
        title={tip}
        className="button"
        disabled={isDisabled}
        onClick={onClickHandler}
      >
        {value}
      </button>
    </div>
  );
}
