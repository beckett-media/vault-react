import { DATE, DATE_REVERSE, EST_VALUE, EST_VALUE_REVERSE, SUBJECT, SUBJECT_REVERSE } from './FiltersEnums';

export const sortOptions = [
  { value: SUBJECT, title: 'Name A-Z' },
  { value: SUBJECT_REVERSE, title: 'Name Z-A' },
  { value: DATE, title: 'Oldest' },
  { value: DATE_REVERSE, title: 'Newest' },
  { value: EST_VALUE_REVERSE, title: 'Most Expensive' },
  { value: EST_VALUE, title: 'Least Expensive' },
];

export const filterOptions = [
  { value: '', title: 'All' },
  { value: 1, title: 'Cards' },
  { value: 2, title: 'Comics' },
];
