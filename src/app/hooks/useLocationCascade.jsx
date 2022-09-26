import React, { useState, useEffect } from 'react';
import { postInventory } from '../services/inventory';
import { blankLocation } from '../const/inventory';

export const useLocationCascade = ({ inventory, cards, comics, setApiRetrigger, setInventory }) => {
  const [cascade, setCascade] = useState('');
  const [isCascadeLoading, setIsCascadeLoading] = useState(false);

  console.log(inventory);

  // Check if inventory can be cascaded
  const isLocationCascadable = (item) => {
    if (item.zone.includes('main') || item.zone.includes('pedestal')) return false;
    else return true;
  };

  // Receive or split items

  // Create location object for each additional item

  //

  const slot = inventory?.slot;

  const cascadeLocations = (cascade === 'comics' ? comics : cards)?.map((item) => {
    {
      inventory, slot;
    }
    slot++;
  });

  console.log(cascadeLocations);

  const postCascade = () => {
    console.log(cascadeLocations);

    // console.log('posting...');
    // setIsCascadeLoading(true);

    // inventory.item_id = itemId - 0;
    // inventory.is_current = true;
    // if (inventory.vault && inventory.zone && isLocationCascadable(inventory)) {
    //   Promise.all(cascadeLocations.map((item) => postInventory(item)))
    //     .catch((e) => console.log(e))
    //     .finally(
    //       setTimeout(() => {
    //         setIsCascadeLoading(false);
    //         setApiRetrigger({});
    //         setInventory(blankLocation);
    //       }, 1000),
    //     );
    // }
    // e.target.reset();
    // setIsCascadeLoading(false);
  };

  return { cascade, setCascade, postCascade, isCascadeLoading };
};
