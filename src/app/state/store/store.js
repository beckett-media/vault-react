import { initialState } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import {
  interestFormReducers,
  itemObjectReducers,
  listFormReducers,
  selectedItemIdsReducers,
  submissionFormReducers,
  withdrawalFormReducers,
} from '../reducers';

export const store = configureStore({
  reducer: {
    interestForm: interestFormReducers,
    itemObject: itemObjectReducers,
    selectedItemIds: selectedItemIdsReducers,
    submissionForm: submissionFormReducers,
    withdrawalForm: withdrawalFormReducers,
    listForm: listFormReducers,
  },
  preloadedState: {
    interestForm: initialState.interestForm,
    itemObject: initialState.itemObject,
    selectedItemIds: initialState.selectedItemIds,
    submissionForm: initialState.submissionForm,
    withdrawalForm: initialState.withdrawalForm,
    listForm: initialState.listForm,
  },
});
