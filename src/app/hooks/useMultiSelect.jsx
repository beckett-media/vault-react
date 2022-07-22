import React, { useState } from 'react';

export const useMultiSelect = () => {
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const isSelected = (id) => selectedItemIds.includes(id);

  const handleItemSelection = (isChecked, id) => {
    if (isChecked) {
      setSelectedItemIds([...selectedItemIds, id]);
    } else {
      setSelectedItemIds(selectedItemIds.filter((itemId) => itemId !== id));
    }
  };

  const clearSelections = () => {
    setSelectedItemIds([]);
  };

  return { selectedItemIds, isSelected, handleItemSelection, clearSelections };
};
