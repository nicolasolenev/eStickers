import React from 'react';
import { Link } from 'react-router-dom';

import { ButtonVisability } from './buttonVisability';
import { ButtonMerge } from './buttonMerge';

export default function Buttons() {
  return (
    <div className="buttons">
      <ButtonVisability fieldName="sequence" text="писи" isSequence={true} />
      <ButtonVisability fieldName="groups" text="Группы" />
      <ButtonVisability fieldName="points" text="Положение" />
      <ButtonVisability fieldName="switches" text="QF" />
      <ButtonVisability fieldName="descriptions" text="Описание" />
      <ButtonVisability fieldName="modulesName" text="Модули" />
      <ButtonVisability fieldName="numeration" text="Нумерация" />
      <ButtonMerge />

      <Link to="/print">
        <button className="button">Сохранить pdf</button>
      </Link>
    </div>
  );
}
