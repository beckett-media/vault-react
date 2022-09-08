export const getVaultingTitle = (item) => {
  if (item.item_type === 1) {
    return `${item.year} ${item.set_name || ''} ${item.card_number ? '#' + item.card_number : ''} ${item.player}`;
  }

  if (item.item_type === 2) {
    return `${item.title} ${item.issue ? '#' + item.issue : ''} ${item.publisher} ${item.year}`;
  }

  return '';
};
