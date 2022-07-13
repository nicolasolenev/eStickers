import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import Button from './buttonsComponents/button';
import Lengths from './Lengths';
import Palette from './palette/palette';
import ButtonCaption from './buttonsComponents/buttonCaption';
import ButtonVisability from './buttonsComponents/buttonVisability';
import PaperFormat from './headerComponents/paperFormat';
import ProjectName from './headerComponents/projectName';
import StartNewProject from './headerComponents/startNewProject';
import { setModal } from '../store/modalSlice';
import { readProject } from '../fs';
import {
  toggleVisability,
  setSettings,
  setFontSize,
} from '../store/settingsSlice';
import {
  setGroups,
  splitDevices,
  clearSelected,
  combineDevices,
} from '../store/devicesSlice';
import { pushState, popState } from '../store/historySlice';
import { combineGroups, splitGroups } from '../store/devicesSlice';
import { deleteSelectedDevices } from '../store/devicesSlice';

export default function ButtonsTop({ devicesRef }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const history = useSelector((state) => state.history);
  const isDisabled = devices.selected.length === 0;

  const onClickHandler = (actions, isGroupsVisability) => {
    actions.forEach((action) => dispatch(action));
    if (isGroupsVisability && !settings.display.groups) {
      dispatch(toggleVisability('groups'));
    }
  };

  const onCancelClickHandler = () => {
    const prevState = history[history.length - 1];
    if (prevState) {
      const groups = prevState.groups;
      const settings = prevState.settings;
      dispatch(setGroups({ groups }));
      dispatch(setSettings(settings));
      dispatch(popState({ groups, settings }));
    }
  };

  function getPageStyle(pageWidth) {
    return `
    @page {
    size: auto ${pageWidth}mm;
    }
    `;
  }

  const handlePrint = useReactToPrint({
    content: () => devicesRef.current,
    pageStyle: getPageStyle(settings.paperWidth),
  });

  return (
    <>
      <div className="buttons-top-wrapper buttons-wrapper">
        <section className="buttons-section">
          <div className="buttons-title">Документ</div>
          <div className="buttons-container buttons-container-document">
            <ProjectName />
            <StartNewProject />
          </div>
        </section>

        <section className="buttons-section">
          <div className="buttons-title">Файл</div>
          <div className="buttons-container">
            <div className="buttons-file">
              <button
                className="button"
                onClick={() => {
                  dispatch(setModal({ type: 'saving' }));
                  setTimeout(() => dispatch(setModal({ isVisible: true })), 0);
                }}
              >
                Сохранить в файл
              </button>

              <label className="button upload-button" htmlFor="upload-file">
                Загрузить из файла
                <input
                  className="upload-file-input"
                  type="file"
                  id="upload-file"
                  onChange={(e) => {
                    readProject(e, dispatch, setGroups, setSettings);
                    e.target.value = null;
                  }}
                ></input>
              </label>
            </div>
          </div>
        </section>

        <section className="buttons-section">
          <div className="buttons-title">Отображение</div>
          <div className="buttons-container">
            <ButtonCaption />
            <div className="displaying-checkboxes">
              <ButtonVisability fieldName="groups" text="Группы" />
              <ButtonVisability fieldName="points" text="Норм. положение" />
              <ButtonVisability fieldName="switches" text="Обознач. на схеме" />
              <ButtonVisability fieldName="descriptions" text="Название" />
              <ButtonVisability fieldName="modulesName" text="Полюса" />
            </div>
          </div>
        </section>

        <section className="buttons-section">
          <div className="buttons-title">Редактирование</div>
          <div className="buttons-container">
            <div className="buttons-top">
              <Button
                value="Отменить"
                tip="Ctrl + Z"
                isDisabled={history.length === 0}
                onClickHandler={onCancelClickHandler}
              />

              <Button
                value="Объединить"
                tip="Ctrl + A"
                isDisabled={isDisabled}
                onClickHandler={() =>
                  onClickHandler([
                    combineDevices(),
                    pushState({ groups: devices.groups, settings }),
                  ])
                }
              />

              <Button
                value="Разделить"
                tip="Ctrl + Shift + A"
                isDisabled={isDisabled}
                onClickHandler={() =>
                  onClickHandler([
                    splitDevices(),
                    pushState({ groups: devices.groups, settings }),
                  ])
                }
              />

              <Button
                value="Сгруппировать"
                tip="Ctrl + S"
                isDisabled={isDisabled}
                onClickHandler={() =>
                  onClickHandler(
                    [
                      combineGroups(),
                      pushState({ groups: devices.groups, settings }),
                    ],
                    true
                  )
                }
              />

              <Button
                value="Разгруппировать"
                tip="Ctrl + Shift + S"
                isDisabled={isDisabled}
                onClickHandler={() =>
                  onClickHandler(
                    [
                      splitGroups(),
                      pushState({ groups: devices.groups, settings }),
                    ],
                    true
                  )
                }
              />

              <Button
                value="Удалить"
                tip="Shift + Delete"
                isDisabled={isDisabled}
                onClickHandler={() =>
                  onClickHandler([
                    deleteSelectedDevices(),
                    pushState({ groups: devices.groups, settings }),
                  ])
                }
              />

              <Button
                value="Отменить выделение"
                tip="Escape"
                isDisabled={isDisabled}
                onClickHandler={() => onClickHandler([clearSelected()])}
              />
            </div>

            <div className="buttons-font-size-wrapper">
              <button
                className=""
                style={{ width: '17px', margin: '2px 0px' }}
                onClick={() => {
                  dispatch(setFontSize({ fontSize: settings.fontSize + 1 }));
                }}
              >
                +
              </button>

              <span>{settings.fontSize}pt</span>

              <button
                className=""
                style={{ width: '17px', margin: '2px 0px' }}
                onClick={() => {
                  if (settings.fontSize > 7)
                    dispatch(setFontSize({ fontSize: settings.fontSize - 1 }));
                }}
              >
                -
              </button>
            </div>
          </div>
        </section>

        <section className="buttons-section">
          <div className="buttons-title">Печать</div>
          <div className="buttons-container">
            <div className="buttons-print">
              <ButtonVisability fieldName="numeration" text="Печать модулей" />

              <button className="button" onClick={handlePrint}>
                Печать
              </button>
            </div>
          </div>
        </section>
      </div>

      <Palette />

      <div className="paper-options">
        <PaperFormat />
        <Lengths />
      </div>
    </>
  );
}
