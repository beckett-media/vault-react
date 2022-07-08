import React from 'react';
import { useSelector } from 'react-redux';
import { selectedItemIdsSelector } from '../../state/selectors';

const GenericForm = (props) => {
  const selectedItemIds = useSelector(selectedItemIdsSelector);

  const genericFormItems = () =>
    props.items.map(
      (item) =>
        selectedItemIds.ids.includes(item.id) && (
          <div key={item.id}>
            {item.serialNumber} - {item.description}
          </div>
        ),
    );
  return (
    <>
      <div>{props.title}</div>
      {genericFormItems()}
    </>
  );
};

export default GenericForm;
