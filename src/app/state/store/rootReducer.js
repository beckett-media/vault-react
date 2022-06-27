import { combineReducers } from '@reduxjs/toolkit';
import { profileFormReducers } from '../Profile/reducers';
import {
  interestFormReducers,
  itemObjectReducers,
  listFormReducers,
  selectedItemIdsReducers,
  submissionFormReducers,
  withdrawalFormReducers,
} from '../reducers';

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
    items: [],
  },
  withdrawalForm: {
    items: [],
  },
  listForm: {
    items: [],
  },
  selectedItemIds: {
    ids: [],
  },
  profileForm: {
    firstName: '',
    lastName: '',
    primaryPhone: '',
    secondaryPhone: '',
    primaryEmail: '',
    secondaryEmail: '',
    shipAddress: '',
    shipCity: '',
    shipState: '',
    shipZipcode: '',
    billAddress: '',
    billCity: '',
    billState: '',
    billZipcode: '',
  },
};

export const appReducer = combineReducers({
  interestForm: interestFormReducers,
  itemObject: itemObjectReducers,
  selectedItemIds: selectedItemIdsReducers,
  submissionForm: submissionFormReducers,
  withdrawalForm: withdrawalFormReducers,
  listForm: listFormReducers,
  profileForm: profileFormReducers,
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
