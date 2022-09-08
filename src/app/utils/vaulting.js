import { ITEM_TYPE } from '../services/items';

export const getVaultingTitle = (item) => {
  if (item.item_type === ITEM_TYPE.TRADING_CARD) {
    return `${item.year} ${item.set_name || ''} ${item.card_number ? '#' + item.card_number : ''} ${item.player}`;
  }

  if (item.item_type === ITEM_TYPE.COMIC) {
    return `${item.title} ${item.issue ? '#' + item.issue : ''} ${item.publisher} ${item.year}`;
  }

  return '';
};
