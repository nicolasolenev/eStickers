import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ButtonVisability from './buttonsComponents/buttonVisability';
import ButtonCaption from './buttonsComponents/buttonCaption';
import ButtonMerge from './buttonsComponents/buttonMerge';
import { clearSelected } from '../store/settingsSlice';
import { combineGroups } from '../store/devicesSlice';

export default function Buttons() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  return (
    <div className="buttons">
      <ButtonCaption />

      <div className="buttons__title">Показать</div>
      <ButtonVisability fieldName="groups" text="Группы" />
      <ButtonVisability fieldName="points" text="Норм. положение" />
      <ButtonVisability fieldName="switches" text="Обознач. на схеме" />
      <ButtonVisability fieldName="descriptions" text="Название" />
      <ButtonVisability fieldName="modulesName" text="Полюса" />

      <div className="buttons__title">Печать модулей</div>
      <ButtonVisability fieldName="numeration" text="Печать модулей" />

      <Link to="/print">
        <button className="button">Сохранить pdf</button>
      </Link>

      <ButtonMerge />

      <button
        className="button"
        onClick={() => {
          if (!settings.selected.length) {
            return;
          }
          dispatch(combineGroups(settings.selected));
          dispatch(clearSelected());
        }}
      >
        Сгруппировать
      </button>
    </div>
  );
}
