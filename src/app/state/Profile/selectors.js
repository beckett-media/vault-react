import { createSelector } from "@reduxjs/toolkit";

export const profileFormSelector = createSelector(
  (state) => state,
  (state) => state.profileForm,
);