import React from 'react';
import { Link } from 'react-router-dom';

import { ButtonVisability } from './buttonVisability';
import { ButtonCaption } from './buttonCaption';
import { ButtonMerge } from './buttonMerge';

export default function Buttons() {
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
    </div>
  );
}
