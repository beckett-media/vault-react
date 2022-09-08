import { ITEM_TYPE } from '../services/items';

const defaultSub = {
  type: 1,
  card_number: '',
  player: '',
  sport: '',
  set_name: '',
  issue: '',
  publisher: '',
  grading_company: '',
  serial_number: '',
  title: '',
  description: '',
  genre: '',
  manufacturer: '',
  year: 1970,
  overall_grade: '',
  sub_grades: '',
  autograph: '',
  subject: '',
  est_value: 0,
  image_base64: '',
  image_format: 'img/png',
  image_rev_base64: '',
  image_rev_format: 'img/png',
};

export const getSubmissionTitle = (item) => {
  const cardNumber = item.card_number || item.cardNumber;
  const setName = item.set_name || item.setName;

  if (item.type === ITEM_TYPE.TRADING_CARD) {
    return `${item.year} ${setName || ''} ${cardNumber ? '#' + cardNumber : ''} ${item.player}`;
  }

  if (item.type === ITEM_TYPE.COMIC) {
    return `${item.issue ? '#' + item.issue : ''} ${item.publisher} ${item.year}`;
  }

  return '';
};

export const formatSubmissionItem = (item, uuid) => {
  const compositedTitle = getSubmissionTitle(item);

  return {
    uuid,
    order_uuid: uuid,
    type: item.type || defaultSub.type,
    player: item.player || defaultSub.player,
    sport: item.sport || defaultSub.sport,
    issue: item.issue || defaultSub.issue,
    card_number: item.cardNumber || defaultSub.card_number,
    publisher: item.publisher || defaultSub.publisher,
    set_name: item.setName || defaultSub.set_name,
    grading_company: item.gradingCompany || defaultSub.grading_company,
    serial_number: item.serialNumber || defaultSub.serial_number,
    title: item.title || compositedTitle,
    description: item.description || defaultSub.description,
    genre: item.genre || defaultSub.genre,
    manufacturer: item.manufacturer || defaultSub.manufacturer,
    year: item.year || defaultSub.year,
    overall_grade: item.grade || defaultSub.overall_grade,
    sub_grades: item.subGrades || defaultSub.sub_grades,
    autograph: item.autoGraph || defaultSub.autograph,
    subject: item.subject || defaultSub.subject,
    est_value: item.estimatedValue || defaultSub.est_value,
    image_base64: item.imageBase64?.split(`data:${item.imageFormat};base64,`)[1] || defaultSub.image_base64,
    image_format: item.imageFormat || defaultSub.image_format,
    image_rev_base64:
      item.imageRevBase64?.split(`data:${item.imageRevFormat};base64,`)[1] || defaultSub.image_rev_base64,
    image_rev_format: item.imageRevFormat || defaultSub.image_rev_format,
  };
};

export const extractUpdatedParts = (src, dst) => {
  const keys = Object.keys(src);
  const result = {};

  for (const key of keys) {
    if (src[key] !== dst[key]) {
      result[key] = dst[key];
    }
  }

  return result;
};
