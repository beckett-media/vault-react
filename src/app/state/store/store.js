import { initialState, rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { interestFormReducers, itemObjectReducers, submissionFormReducers } from '../reducers';

export const store = configureStore({
  reducer: {
    interestForm: interestFormReducers,
    itemObject: itemObjectReducers,
    submissionForm: submissionFormReducers,
  },
  preloadedState: { 
    interestForm: initialState.interestForm, 
    itemObject: initialState.itemObject,
    submissionForm: initialState.submissionForm
  },
});
