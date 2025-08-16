import React from 'react';
import EditableList from '../../Components/editableList/EditableList';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export default function Phone() {
  const {user} = useSelector((state: RootState) => state.user);

  return (
    <EditableList
      title="Phone"
      data={user?.phoneNumber || []}
      onEdit={(index, value) => {
        // Navigate to edit form or inline edit
      }}
      onDelete={index => {}}
      onAdd={() => {
        // Show modal or navigate to add phone form
      }}
    />
  );
}
