import { createSelector } from '@reduxjs/toolkit';

export const interestFormSelector = createSelector(
  state => state,
  state => state.interestForm,
);
