import { initialState, rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { interestFormReducers } from '../reducers';

export const store = configureStore({
  reducer: {
    interestForm: interestFormReducers,
  },
  preloadedState: { interestForm: initialState.interestForm },
});
