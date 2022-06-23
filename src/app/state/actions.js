import {
  SET_FIRST,
  SET_LAST,
  SET_PHONE,
  SET_EMAIL,
  SET_BECKETT_ID,
  SET_CHECKBOX_6,
  SET_CHECKBOX_5,
  SET_CHECKBOX_4,
  SET_CHECKBOX_3,
  SET_CHECKBOX_2,
  SET_CHECKBOX_1,
  RESET_FORM,
  ADD_SUBMISSION_ITEM,
  REMOVE_SUBMISSION_ITEM,
  SET_CATEGORY,
  SET_GRADING_COMPANY,
  SET_SERIAL_NUMBER,
  SET_DESCRIPTION,
  SET_TITLE,
  SET_GENRE,
  SET_MANUFACTURER,
  SET_YEAR,
  SET_OVERALL_GRADE,
  SET_AUTOGRAPH_GRADE,
  SET_SUB_GRADES,
  SET_SUBJECT,
  SET_IMAGE,
  ADD_LIST_ITEM,
  SET_LIST_FORM,
  REMOVE_LIST_ITEM,
  REMOVE_WITHDRAWAL_ITEM,
  ADD_WITHDRAWAL_ITEM,
  SET_WITHDRAWAL_FORM,
  SET_SELECTED_ITEM_IDS,
  SET_SELECTED_ITEM_ID,
  REMOVE_SELECTED_ITEM_ID,
} from './types';

export const setFirst = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_FIRST,
    payload: payload,
  };
};
export const setLast = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_LAST,
    payload: payload,
  };
};
export const setPhone = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_PHONE,
    payload: payload,
  };
};
export const setEmail = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_EMAIL,
    payload: payload,
  };
};
export const setBeckettId = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_BECKETT_ID,
    payload: payload,
  };
};
export const setCheckbox1 = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_CHECKBOX_1,
    payload: payload,
  };
};
export const setCheckbox2 = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_CHECKBOX_2,
    payload: payload,
  };
};
export const setCheckbox3 = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_CHECKBOX_3,
    payload: payload,
  };
};
export const setCheckbox4 = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_CHECKBOX_4,
    payload: payload,
  };
};
export const setCheckbox5 = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_CHECKBOX_5,
    payload: payload,
  };
};
export const setCheckbox6 = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: SET_CHECKBOX_6,
    payload: payload,
  };
};

// submission form
export const setSubmissionForm = (payload) => {
  console.log('payload is', payload.submissionForm);
  return {
    type: SET_SUBMISSION_FORM,
    payload: payload,
  };
};

export const addSubmissionItem = (payload) => {
  console.log('payload is', payload.itemObject);
  return {
    type: ADD_SUBMISSION_ITEM,
    payload: payload,
  };
};

export const removeSubmissionItem = (payload) => {
  console.log('payload is', payload.submissionForm);
  return {
    type: REMOVE_SUBMISSION_ITEM,
    payload: payload,
  };
};

// withdrawal reducers
export const setWithdrawalForm = (payload) => {
  console.log('payload is', payload.withdrawalForm);
  return {
    type: SET_WITHDRAWAL_FORM,
    payload: payload,
  };
};

export const addWithdrawalItem = (payload) => {
  console.log('payload is', payload.itemObject);
  return {
    type: ADD_WITHDRAWAL_ITEM,
    payload: payload,
  };
};

export const removeWithdrawalItem = (payload) => {
  console.log('payload is', payload.submissionForm);
  return {
    type: REMOVE_WITHDRAWAL_ITEM,
    payload: payload,
  };
};

// list items form
export const setListForm = (payload) => {
  console.log('payload is', payload.listForm);
  return {
    type: SET_LIST_FORM,
    payload: payload,
  };
};

export const addListItem = (payload) => {
  console.log('payload is', payload.itemObject);
  return {
    type: ADD_LIST_ITEM,
    payload: payload,
  };
};

export const removeListItem = (payload) => {
  console.log('payload is', payload.submissionForm);
  return {
    type: REMOVE_LIST_ITEM,
    payload: payload,
  };
};

// itemObject actions
export const setCategory = (payload) => {
  return {
    type: SET_CATEGORY,
    payload: payload,
  };
};
export const setGradingCompany = (payload) => {
  return {
    type: SET_GRADING_COMPANY,
    payload: payload,
  };
};
export const setSerialNumber = (payload) => {
  return {
    type: SET_SERIAL_NUMBER,
    payload: payload,
  };
};
export const setDescription = (payload) => {
  return {
    type: SET_DESCRIPTION,
    payload: payload,
  };
};
export const setTitle = (payload) => {
  return {
    type: SET_TITLE,
    payload: payload,
  };
};
export const setGenre = (payload) => {
  return {
    type: SET_GENRE,
    payload: payload,
  };
};
export const setManufacturer = (payload) => {
  return {
    type: SET_MANUFACTURER,
    payload: payload,
  };
};
export const setYear = (payload) => {
  return {
    type: SET_YEAR,
    payload: payload,
  };
};
export const setOverallGrade = (payload) => {
  return {
    type: SET_OVERALL_GRADE,
    payload: payload,
  };
};
export const setAutographGrade = (payload) => {
  return {
    type: SET_AUTOGRAPH_GRADE,
    payload: payload,
  };
};
export const setSubGrades = (payload) => {
  return {
    type: SET_SUB_GRADES,
    payload: payload,
  };
};
export const setSubject = (payload) => {
  return {
    type: SET_SUBJECT,
    payload: payload,
  };
};
export const setImage = (payload) => {
  return {
    type: SET_IMAGE,
    payload: payload,
  };
};

// selected item ids
export const setSelectedItemId = (payload) => {
  return {
    type: SET_SELECTED_ITEM_ID,
    payload: payload,
  };
};
export const removeSelectedItemIds = (payload) => {
  return {
    type: REMOVE_SELECTED_ITEM_ID,
    payload: payload,
  };
};
export const setSelectedItemIds = (payload) => {
  return {
    type: SET_SELECTED_ITEM_IDS,
    payload: payload,
  };
};

// on Logout action
export const resetForm = (payload) => {
  console.log('payload is', payload.interestForm);
  return {
    type: RESET_FORM,
    payload: payload,
  };
};

