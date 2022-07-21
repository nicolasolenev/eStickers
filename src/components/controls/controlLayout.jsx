import React from 'react';

import { getClasses } from '../../functions';

export default function ControlLayout({ children, name, className }) {
  const classes = getClasses('buttons-container', { [className]: className });

  return (
    <section className="buttons-section">
      <div className="buttons-title">{name}</div>
      <div className={classes}>{children}</div>
    </section>
  );
}
