import { createSelector } from '@reduxjs/toolkit';

export const interestFormSelector = createSelector(
    (state) => state,
    (state) => state.interestForm,
);

export const itemObjectSelector = createSelector(
    (state) => state,
    (state) => state.itemObject,
);

export const submissionFormSelector = createSelector(
    (state) => state,
    (state) => state.submissionForm,
);
