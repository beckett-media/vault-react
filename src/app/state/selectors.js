import { createSelector } from '@reduxjs/toolkit';

export const cartSelector = createSelector(
  (state) => state,
  (state) => state.cartForm,
);


