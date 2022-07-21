import React from 'react';
import { useSelector } from 'react-redux';

import ControlLayout from './controlLayout';
import ButtonVisability from './buttonVisability';
import ButtonCaption from './buttonCaption';
import localization from '../../localization';

export default function ViewControls() {
  const settings = useSelector((state) => state.settings);
  const lang = settings.localization;

  return (
    <ControlLayout name={localization.controls.view.title[lang]}>
      <ButtonCaption />
      <div className="displaying-checkboxes">
        <ButtonVisability
          fieldName="groups"
          text={localization.controls.view.checkbox.group[lang]}
        />
        <ButtonVisability
          fieldName="points"
          text={localization.controls.view.checkbox.point[lang]}
        />
        <ButtonVisability
          fieldName="switches"
          text={localization.controls.view.checkbox.switch[lang]}
        />
        <ButtonVisability
          fieldName="descriptions"
          text={localization.controls.view.checkbox.name[lang]}
        />
        <ButtonVisability
          fieldName="modulesName"
          text={localization.controls.view.checkbox.module[lang]}
        />
      </div>
    </ControlLayout>
  );
}
