import React from 'react';

import Group from './group';
import AddGroupBtn from './devicesComponents/addGroupBtn';

export default function Din({ groupsId, dinId }) {
  return (
    <div className="devices__din">
      {groupsId.map((groupId) => {
        return <Group key={groupId} dinId={dinId} groupId={groupId} />;
      })}

      <AddGroupBtn dinId={dinId} />
    </div>
  );
}
