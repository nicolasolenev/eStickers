import { nanoid } from 'nanoid';

import { addModule } from './store/modulesSliceNew';
import { addDevice } from './store/devicesSliceNew';
import { addGroup } from './store/groupsSliceNew';
import { addGroupAtDin } from './store/dinsSliceNew';

export const addNewGroup = (dispatch, dinId) => {
  const id = nanoid();

  dispatch(addModule({ id, dinId }));
  dispatch(addDevice({ id, dinId }));
  dispatch(addGroup({ id, dinId }));
  dispatch(addGroupAtDin({ id, dinId }));
};
