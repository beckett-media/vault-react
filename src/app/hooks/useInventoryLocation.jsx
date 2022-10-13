import { useEffect, useState } from 'react';
import { blankLocation } from '../const/inventory';
import { getInventory, postInventory, putInventory } from '../services/inventory';

export const CASCADE_TYPE = {
  COMIC: 'comic',
  CARD: 'card',
};

export const useInventoryLocation = (itemId, comics, cards) => {
  const [apiRetrigger, setApiRetrigger] = useState({});
  const [initialInventory, setInitialInventory] = useState([]);
  const [inventory, setInventory] = useState(blankLocation);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPutLoading, setIsPutLoading] = useState(false);
  const [isGetLoading, setIsGetLoading] = useState(false);
  const [newLocationId, setNewLocationId] = useState();
  const [cascade, setCascade] = useState('');

  let slot = inventory?.slot;
  const cascadeLocations = [];

  if (!!cascade) {
    (cascade === CASCADE_TYPE.COMIC ? comics : cards)?.forEach((item, index) => {
      cascadeLocations.push({ ...inventory, slot: slot.toString(), is_current: true, item_id: itemId + index });
      slot++;
    });
  }

  useEffect(() => {
    setIsGetLoading(true);
    getInventory({ item_ids: [itemId] })
      .then((data) => {
        setInitialInventory(data);
      })
      .catch()
      .finally(() => {
        setIsGetLoading(false);
      });
  }, [apiRetrigger]);

  const currentLocation = initialInventory?.find((item) => item.status === 1);

  const updateInventory = (tempInventory) => setInventory({ ...inventory, ...tempInventory });

  const postLocation = (onSuccess) => {
    setIsPostLoading(true);
    console.log(inventory);
    inventory.item_id = itemId - 0;
    inventory.is_current = true;
    if (!cascade && inventory.vault && inventory.zone) {
      postInventory(inventory)
        .then(() => {
          if (onSuccess) {
            onSuccess();
          }
        })
        .finally(
          setTimeout(() => {
            setIsPostLoading(false);
            setApiRetrigger({});
            setInventory(blankLocation);
          }, 1000),
        );
    } else if (!!cascade && inventory.vault && inventory.zone) {
      Promise.all(
        cascadeLocations.map((item) => {
          postInventory(item)
            .then(() => {
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((e) => console.log(e))
            .finally(
              setTimeout(() => {
                setIsPostLoading(false);
                setApiRetrigger({});
                setInventory(blankLocation);
                cascadeLocations.forEach((item) => cascadeLocations.pop());
              }, 1000),
            );
        }),
      );
    }
  };

  const putLocation = () => {
    setIsPutLoading(true);
    const putBody = { status: 1, note: 'updating location', ...inventory };
    console.log('putBody is ', putBody);
    putInventory(newLocationId, putBody).finally(
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
    setInventory,
    setApiRetrigger,
    updateInventory,
    putLocation,
    postLocation,
    setNewLocationId,
    isPostLoading,
    isPutLoading,
    isGetLoading,
    setCascade,
    cascade,
  };
};
