import { combineReducers } from '@reduxjs/toolkit';
import { interestFormReducers, itemObjectReducers, submissionFormReducers } from '../reducers';

export const initialState = {
  interestForm: {
    first: '',
    last: '',
    phone: '',
    email: '',
    beckettId: '',
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
  },
  itemObject: {
    category: '',
    gradingCompany: '',
    serialNumber: '',
    description: '',
    title: '',
    genre: '',
    manufacturer: '',
    year: '',
    overallGrade: '',
    subGrades: '',
    autographGrade: '',
    subject: '',
    image: '',
  },
  submissionForm: {
    items: []
  }
};

export const appReducer = combineReducers({
  interestForm: interestFormReducers,
  itemObject: itemObjectReducers,
  submissionForm: submissionFormReducers
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
