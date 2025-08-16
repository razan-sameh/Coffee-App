import React from 'react';
import EditableList from '../Components/editableList/EditableList';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';

export default function Address() {
  const {user} = useSelector((state: RootState) => state.user);

  return (
    <EditableList
      title="Address"
      data={user?.address || []}
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
