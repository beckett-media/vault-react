import { initialState } from './store/rootReducer';
import {
  ADD_LIST_ITEM,
  ADD_SUBMISSION_ITEM,
  ADD_WITHDRAWAL_ITEM,
  REMOVE_LIST_ITEM,
  REMOVE_SELECTED_ITEM_ID,
  REMOVE_SUBMISSION_ITEM,
  REMOVE_WITHDRAWAL_ITEM,
  RESET_FORM,
  SET_AUTOGRAPH_GRADE,
  SET_BECKETT_ID,
  SET_CATEGORY,
  SET_CHECKBOX_1,
  SET_CHECKBOX_2,
  SET_CHECKBOX_3,
  SET_CHECKBOX_4,
  SET_CHECKBOX_5,
  SET_CHECKBOX_6,
  SET_DESCRIPTION,
  SET_EMAIL,
  SET_FIRST,
  SET_GENRE,
  SET_GRADING_COMPANY,
  SET_IMAGE,
  SET_LAST,
  SET_LIST_FORM,
  SET_MANUFACTURER,
  SET_OVERALL_GRADE,
  SET_PHONE,
  SET_SELECTED_ITEM_ID,
  SET_SELECTED_ITEM_IDS,
  SET_SERIAL_NUMBER,
  SET_SUBJECT,
  SET_SUBMISSION_FORM,
  SET_SUB_GRADES,
  SET_TITLE,
  SET_WITHDRAWAL_FORM,
  SET_YEAR,
} from './types';

export const interestFormReducers = (state = { initialState }, action) => {
  console.log('reducer returns ', action.payload);
  switch (action.type) {
    case SET_FIRST:
      console.log(action);
      return { ...state, first: action.payload.interestForm.first };
    case SET_LAST:
      console.log(action);
      return { ...state, last: action.payload.interestForm.last };
    case SET_PHONE:
      console.log(action);
      return { ...state, phone: action.payload.interestForm.phone };
    case SET_EMAIL:
      console.log(action);
      return { ...state, email: action.payload.interestForm.email };
    case SET_BECKETT_ID:
      console.log(action);
      return {
        ...state,
        beckettId: action.payload.interestForm.beckettId,
      };
    case SET_CHECKBOX_1:
      console.log(action);
      return {
        ...state,
        checkbox1: action.payload.interestForm.checkbox1,
      };
    case SET_CHECKBOX_2:
      console.log(action);
      return {
        ...state,
        checkbox2: action.payload.interestForm.checkbox2,
      };
    case SET_CHECKBOX_3:
      console.log(action);
      return {
        ...state,
        checkbox3: action.payload.interestForm.checkbox3,
      };
    case SET_CHECKBOX_4:
      console.log(action);
      return {
        ...state,
        checkbox4: action.payload.interestForm.checkbox4,
      };
    case SET_CHECKBOX_5:
      console.log(action);
      return {
        ...state,
        checkbox5: action.payload.interestForm.checkbox5,
      };
    case SET_CHECKBOX_6:
      console.log(action);
      return {
        ...state,
        checkbox6: action.payload.interestForm.checkbox6,
      };

    default:
      return state;
  }
};

export const submissionFormReducers = (state = { initialState }, action) => {
  console.log('reducer returns ', action.payload);
  switch (action.type) {
    case SET_SUBMISSION_FORM:
      console.log(action);
      return {
        ...state,
        items: action.payload,
      };
    case ADD_SUBMISSION_ITEM:
      console.log(action);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_SUBMISSION_ITEM:
      console.log(action);
      return {
        ...state,
        items: state.items.filter(
          (obj) => obj.serialNumber === action.payload.itemObject.serialNumber,
        ),
      };
    default:
      return state;
  }
};

export const withdrawalFormReducers = (state = { initialState }, action) => {
  console.log('reducer returns ', action.payload);
  switch (action.type) {
    case SET_WITHDRAWAL_FORM:
      console.log(action);
      return {
        ...state,
        items: action.payload,
      };
    case ADD_WITHDRAWAL_ITEM:
      console.log(action);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_WITHDRAWAL_ITEM:
      console.log(action);
      return {
        ...state,
        items: state.items.filter(
          (obj) => obj.id === action.payload.itemObject.id,
        ),
      };
    default:
      return state;
  }
};

export const listFormReducers = (state = { initialState }, action) => {
  console.log('reducer returns ', action.payload);
  switch (action.type) {
    case SET_LIST_FORM:
      console.log(action);
      return {
        ...state,
        items: action.payload,
      };
    case ADD_LIST_ITEM:
      console.log(action);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_LIST_ITEM:
      console.log(action);
      return {
        ...state,
        items: state.items.filter(
          (obj) => obj.id === action.payload.itemObject.id,
        ),
      };
    default:
      return state;
  }
};

// Selected Item Ids
export const selectedItemIdsReducers = (state = { initialState }, action) => {
  console.log('reducer returns ', action.payload);
  switch (action.type) {
    case SET_SELECTED_ITEM_ID:
      console.log(action);
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    case REMOVE_SELECTED_ITEM_ID:
      console.log(action);
      return {
        ...state,
        ids: state.ids.filter((idToRm) => idToRm !== action.payload),
      };
    case SET_SELECTED_ITEM_IDS:
      console.log(action);
      return {
        ...state,
        ids: action.payload,
      };
    default:
      return state;
  }
};

// Item object reducers
export const itemObjectReducers = (state = { initialState }, action) => {
  console.log('reducer returns ', action.payload);
  switch (action.type) {
    case SET_CATEGORY:
      console.log(action);
      return {
        ...state,
        category: action.payload.itemObject.cateogory,
      };
    case SET_GRADING_COMPANY:
      console.log(action);
      return {
        ...state,
        gradingCompany: action.payload.itemObject.gradingCompany,
      };
    case SET_SERIAL_NUMBER:
      console.log(action);
      return {
        ...state,
        serialNumber: action.payload.itemObject.serialNumber,
      };
    case SET_DESCRIPTION:
      console.log(action);
      return {
        ...state,
        description: action.payload.itemObject.description,
      };
    case SET_TITLE:
      console.log(action);
      return {
        ...state,
        title: action.payload.itemObject.title,
      };
    case SET_GENRE:
      console.log(action);
      return {
        ...state,
        genre: action.payload.itemObject.genre,
      };
    case SET_MANUFACTURER:
      console.log(action);
      return {
        ...state,
        manufacturer: action.payload.itemObject.manufacturer,
      };
    case SET_YEAR:
      console.log(action);
      return {
        ...state,
        year: action.payload.itemObject.year,
      };
    case SET_OVERALL_GRADE:
      console.log(action);
      return {
        ...state,
        overallGrade: action.payload.itemObject.overallGrade,
      };
    case SET_AUTOGRAPH_GRADE:
      console.log(action);
      return {
        ...state,
        autographGrade: action.payload.itemObject.autographGrade,
      };
    case SET_SUB_GRADES:
      console.log(action);
      return {
        ...state,
        subGrade: action.payload.itemObject.subGrade,
      };
    case SET_SUBJECT:
      console.log(action);
      return {
        ...state,
        subject: action.payload.itemObject.subject,
      };
    case SET_IMAGE:
      console.log(action);
      return {
        ...state,
        image: action.payload.itemObject.image,
      };

    default:
      return state;
  }
};

// On logout
//   case RESET_FORM:
//     console.log(action);
//     return { ...state, initialState };

//   default:
//     return state;
// }
// };
