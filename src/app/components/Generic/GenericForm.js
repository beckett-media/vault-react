import React from 'react';

const GenericForm = (props) => {
  const [selectedItemIds, setSelectedItemIds] = useState(props.items.map(item => item.id));
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
