import { createSelector } from "@reduxjs/toolkit";

export const formSelector = createSelector(state=> state, state=> state.form)