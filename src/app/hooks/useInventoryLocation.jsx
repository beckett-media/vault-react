import React, { useEffect, useState } from 'react';
import { getInventory, postInventory, putInventory } from '../services/inventory';

const blankLocation = {
  vault: '',
  zone: '',
  shelf: '',
  row: '',
  box: '',
  slot: '',
};

export const useInventoryLocation = (itemId) => {
  const [apiRetrigger, setApiRetrigger] = useState({});
  const [initialInventory, setInitialInventory] = useState({});
  const [inventory, setInventory] = useState(blankLocation);

  useEffect(() => {
    getInventory({ item_ids: [itemId] })
      .then((data) => {
        setInitialInventory(...data);
      })
      .catch(console.log('failed to retrieve inventory'));
  }, [apiRetrigger]);

  const updateInventory = (tempInventory) => setInventory({ ...inventory, ...tempInventory });

  const locationFormSubmit = (e) => {
    e.preventDefault();

    if (!!initialInventory) {
      putInventory(itemId, inventory)
        .then()
        .catch((e) => console.log(e));
      setApiRetrigger({});
    } else {
      inventory.item_id = item.item_id;
      postInventory(inventory)
        .then()
        .catch((e) => console.log(e));
      setApiRetrigger({});
    }
  };

  return { inventory, initialInventory, updateInventory, locationFormSubmit };
};
