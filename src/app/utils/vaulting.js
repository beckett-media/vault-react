import { SUBMISSION_TYPE } from '../services/submission';

export const getVaultingTitle = (item) => {
  if (item.item_type === SUBMISSION_TYPE.SPORTS_CARD) {
    return `${item.year} ${item.set_name || ''} ${item.card_number ? '#' + item.card_number : ''} ${item.player}`;
  }

  if (item.item_type === SUBMISSION_TYPE.COMIC) {
    return `${item.title} ${item.issue ? '#' + item.issue : ''} ${item.publisher} ${item.year}`;
  }

  return '';
};
