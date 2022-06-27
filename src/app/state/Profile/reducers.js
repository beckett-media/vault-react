import {
  SET_PROFILE_BILL_ADDRESS,
  SET_PROFILE_BILL_CITY,
  SET_PROFILE_BILL_STATE,
  SET_PROFILE_BILL_ZIPCODE,
  SET_PROFILE_FIRST_NAME,
  SET_PROFILE_FORM,
  SET_PROFILE_LAST_NAME,
  SET_PROFILE_PRIMARY_EMAIL,
  SET_PROFILE_PRIMARY_PHONE,
  SET_PROFILE_SECONDARY_EMAIL,
  SET_PROFILE_SECONDARY_PHONE,
  SET_PROFILE_SHIP_ADDRESS,
  SET_PROFILE_SHIP_CITY,
  SET_PROFILE_SHIP_STATE,
  SET_PROFILE_SHIP_ZIPCODE
} from "./types";
import { initialState } from "../store/rootReducer";

export const profileFormReducers = (state = { initialState }, action) => {
  console.log('reducer returns ', action.payload);
  switch (action.type) {
    case SET_PROFILE_FORM:
      console.log(action);
      return {
        ...state,
        profileForm: action.payload,
      };
    case SET_PROFILE_LAST_NAME:
      console.log(action);
      return {
        ...state,
        lastName: action.payload,
      };
    case SET_PROFILE_FIRST_NAME:
      console.log(action);
      return {
        ...state,
        firstName: action.payload,
      };
    case SET_PROFILE_PRIMARY_PHONE:
      console.log(action);
      return {
        ...state,
        primaryPhone: action.payload,
      };
    case SET_PROFILE_SECONDARY_PHONE:
      console.log(action);
      return {
        ...state,
        secondaryPhone: action.payload,
      };
    case SET_PROFILE_PRIMARY_EMAIL:
      console.log(action);
      return {
        ...state,
        primaryEmail: action.payload,
      };
    case SET_PROFILE_SECONDARY_EMAIL:
      console.log(action);
      return {
        ...state,
        secondaryEmail: action.payload,
      };
    case SET_PROFILE_SHIP_ADDRESS:
      console.log(action);
      return {
        ...state,
        shipAddress: action.payload,
      };
    case SET_PROFILE_SHIP_CITY:
      console.log(action);
      return {
        ...state,
        shipCity: action.payload,
      };
    case SET_PROFILE_SHIP_STATE:
      console.log(action);
      return {
        ...state,
        shipState: action.payload,
      };
    case SET_PROFILE_SHIP_ZIPCODE:
      console.log(action);
      return {
        ...state,
        shipZipcode: action.payload,
      };
    case SET_PROFILE_BILL_ADDRESS:
      console.log(action);
      return {
        ...state,
        billAddress: action.payload,
      };
    case SET_PROFILE_BILL_CITY:
      console.log(action);
      return {
        ...state,
        billCity: action.payload,
      };
    case SET_PROFILE_BILL_STATE:
      console.log(action);
      return {
        ...state,
        billState: action.payload,
      };
    case SET_PROFILE_BILL_ZIPCODE:
      console.log(action);
      return {
        ...state,
        billZipcode: action.payload,
      };
    default:
      return state;
  };
};