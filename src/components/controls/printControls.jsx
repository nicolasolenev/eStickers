import React from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import ControlLayout from './controlLayout';
import ButtonVisability from './buttonVisability';
import { getPageStyle } from '../../functions';
import localization from '../../localization';

export default function PrintControls({ devicesRef }) {
  const settings = useSelector((state) => state.settings);
  const lang = settings.localization;

  const handlePrint = useReactToPrint({
    content: () => devicesRef.current,
    pageStyle: getPageStyle(settings.paperWidth),
  });

  return (
    <ControlLayout name={localization.controls.print.title[lang]}>
      <div className="buttons-print">
        <ButtonVisability
          fieldName="numeration"
          text={localization.controls.print.checkbox[lang]}
        />

        <button className="button" onClick={handlePrint}>
          {localization.controls.print.title[lang]}
        </button>
      </div>
    </ControlLayout>
  );
}
