import React from 'react';

import ControlLayout from './controlLayout';
import ButtonVisability from './buttonVisability';
import ButtonCaption from './buttonCaption';

export default function ViewControls() {
  return (
    <ControlLayout name="Показать">
      <ButtonCaption />
      <div className="displaying-checkboxes">
        <ButtonVisability fieldName="groups" text="Группы" />
        <ButtonVisability fieldName="points" text="Норм. положения" />
        <ButtonVisability fieldName="switches" text="Обознач. на схеме" />
        <ButtonVisability fieldName="descriptions" text="Названия" />
        <ButtonVisability fieldName="modulesName" text="Полюсы" />
      </div>
    </ControlLayout>
  );
}
