import React, { useEffect, useState } from 'react';
import { getInventory, postInventory, putInventory } from '../services/inventory';
import { blankLocation } from '../const/inventory';

export const useInventoryLocation = (itemId) => {
  const [apiRetrigger, setApiRetrigger] = useState({});
  const [initialInventory, setInitialInventory] = useState([]);
  const [inventory, setInventory] = useState(blankLocation);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPutLoading, setIsPutLoading] = useState(false);
  const [newLocationId, setNewLocationId] = useState();

  useEffect(() => {
    getInventory({ item_ids: [itemId] })
      .then((data) => {
        setInitialInventory(data);
      })
      .catch();
  }, [apiRetrigger]);

  const currentLocation = initialInventory?.find((item) => item.status === 1);

  const findInventoryById = (id) => {
    initialInventory.find((item) => item.id === id);
  };

  const updateInventory = (tempInventory) => setInventory({ ...inventory, ...tempInventory });

  const postLocation = () => {
    console.log('posting...');
    setIsPostLoading(true);

    inventory.item_id = itemId - 0;
    inventory.is_current = true;
    if (inventory.vault && inventory.zone) {
      postInventory(inventory)
        .then()
        .catch()
        .finally(
          setTimeout(() => {
            setIsPostLoading(false);
            setApiRetrigger({});
            setInventory(blankLocation);
          }, 1000),
        );
    }
    e.target.reset();
    setIsPostLoading(false);
  };

  const putLocation = () => {
    setIsPutLoading(true);
    const putBody = { status: 1, note: 'updating location' };

    putInventory(newLocationId, putBody)
      .then()
      .catch()
      .finally(
        setTimeout(() => {
          setIsPutLoading(false);
          setApiRetrigger({});
        }, 1000),
      );
  };

  return {
    currentLocation,
    inventory,
    initialInventory,
    updateInventory,
    putLocation,
    postLocation,
    setNewLocationId,
    isPostLoading,
    isPutLoading,
  };
};
