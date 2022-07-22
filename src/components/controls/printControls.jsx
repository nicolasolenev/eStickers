import React from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import ControlLayout from './controlLayout';
import ButtonVisability from './buttonVisability';
import { getPageStyle } from '../../functions';

export default function PrintControls({ devicesRef }) {
  const settings = useSelector((state) => state.settings);

  const handlePrint = useReactToPrint({
    content: () => devicesRef.current,
    pageStyle: getPageStyle(settings.paperWidth),
  });

  return (
    <ControlLayout name="Печать">
      <div className="buttons-print">
        <ButtonVisability
          fieldName="numeration"
          text="Печатать номера модулей"
        />

        <button className="button" onClick={handlePrint}>
          Печатать
        </button>
      </div>
    </ControlLayout>
  );
}
